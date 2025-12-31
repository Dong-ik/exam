const express = require('express');
const router = express.Router();
const axios = require('axios');

// 네이버 검색 API를 사용한 장소 검색
router.get('/places', async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: '검색어를 입력해주세요.' });
    }

    try {
        const clientId = process.env.NAVER_SEARCH_CLIENT_ID;
        const clientSecret = process.env.NAVER_SEARCH_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            return res.status(500).json({ error: '네이버 검색 API 키가 설정되지 않았습니다.' });
        }

        const response = await axios.get('https://openapi.naver.com/v1/search/local.json', {
            params: {
                query: query,
                display: 5, // 검색 결과 개수
                sort: 'random' // 정렬 방식: random 또는 comment
            },
            headers: {
                'X-Naver-Client-Id': clientId,
                'X-Naver-Client-Secret': clientSecret
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('네이버 검색 API 오류:', error.response?.data || error.message);
        res.status(500).json({ 
            error: '검색 중 오류가 발생했습니다.',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;
