import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

export const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // 네이버 맵 API가 로드되었는지 확인
        if (window.naver && window.naver.maps) {
            // 지도 중심 좌표 (서울 시청)
            const mapOptions = {
                center: new window.naver.maps.LatLng(37.5665, 126.9780),
                zoom: 15 // 지도 확대 레벨
            };

            // 지도 생성
            map.current = new window.naver.maps.Map(mapContainer.current, mapOptions);

            // 마커 생성
            const marker = new window.naver.maps.Marker({
                position: new window.naver.maps.LatLng(37.5665, 126.9780),
                map: map.current
            });

            // 정보 창 생성 (선택사항)
            const infoWindow = new window.naver.maps.InfoWindow({
                content: '<div style="padding:10px;">서울 시청</div>'
            });

            // 마커 클릭 이벤트
            window.naver.maps.Event.addListener(marker, 'click', () => {
                if (infoWindow.getMap()) {
                    infoWindow.close();
                } else {
                    infoWindow.open(map.current, marker);
                }
            });
        } else {
            console.error('네이버 맵 API가 로드되지 않았습니다.');
        }
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            alert('검색어를 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/search/places?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();

            if (!response.ok) {
                alert(data.error || '검색 중 오류가 발생했습니다.');
                return;
            }

            if (!data.items || data.items.length === 0) {
                alert('검색 결과가 없습니다.');
                return;
            }

            // 첫 번째 검색 결과 사용
            const firstItem = data.items[0];
            const lat = firstItem.mapy / 10000000; // 네이버 API는 좌표를 10000000배로 제공
            const lng = firstItem.mapx / 10000000;

            if (window.naver && window.naver.maps && map.current) {
                const point = new window.naver.maps.LatLng(lat, lng);

                // 지도 중심을 검색된 위치로 이동
                map.current.setCenter(point);
                map.current.setZoom(16);

                // 기존 마커 제거 후 새 마커 생성
                const marker = new window.naver.maps.Marker({
                    position: point,
                    map: map.current
                });

                // 정보창 생성
                const infoWindow = new window.naver.maps.InfoWindow({
                    content: `<div style="padding:10px;min-width:200px;">
                        <h4 style="margin:0 0 5px 0;">${firstItem.title.replace(/<[^>]*>/g, '')}</h4>
                        <p style="margin:0;font-size:12px;color:#666;">${firstItem.address}</p>
                    </div>`
                });

                // 마커 클릭 이벤트
                window.naver.maps.Event.addListener(marker, 'click', () => {
                    if (infoWindow.getMap()) {
                        infoWindow.close();
                    } else {
                        infoWindow.open(map.current, marker);
                    }
                });

                // 검색 후 바로 정보창 표시
                infoWindow.open(map.current, marker);
            }
        } catch (error) {
            console.error('검색 오류:', error);
            alert('검색 중 오류가 발생했습니다.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="map-page">
            <h2>네이버 지도</h2>
            <div className="map-search-container">
                <input
                    type="text"
                    className="map-search-input"
                    placeholder="장소, 주소를 검색하세요"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button className="map-search-button" onClick={handleSearch}>
                    검색
                </button>
            </div>
            <div 
                ref={mapContainer} 
                className="map-container"
            ></div>
        </div>
    );
}