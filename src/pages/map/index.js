import React, { useEffect, useRef } from 'react';
import './Map.css';

export const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);

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

    return (
        <div className="map-page">
            <h2>네이버 지도</h2>
            <div 
                ref={mapContainer} 
                className="map-container"
            ></div>
        </div>
    );
}