package com.example.thien_long.utils;

import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class PriceUtils {
    public static double getRateFromVND(String lang) {
        String target = getCurrencyCodeByLang(lang);
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://open.er-api.com/v6/latest/VND";   // base = VND
        ResponseEntity<String> res = restTemplate.getForEntity(url, String.class);

        JSONObject json   = new JSONObject(res.getBody());
        System.out.println(json);
        JSONObject rates  = json.getJSONObject("rates");


        if (!rates.has(target)) {
            throw new IllegalArgumentException("Unsupported currency code: " + target);
        }
        return rates.getDouble(target);
    }

    public static String getCurrencyCodeByLang(String lang) {
        switch (lang.toLowerCase()) {
            case "en":
                return "USD";
            case "vi":
                return "VND";
            case "ja":
                return "JPY";
            case "fr":
                return "EUR";
            case "ko":
                return "KRW";
            case "zh":
                return "CNY";
            case "th":
                return "THB";
            case "de":
                return "EUR";
            default:
                return "USD";
        }
    }

    public static void main(String[] args) {
        System.out.println(getRateFromVND("USD"));
        System.out.println(26075.01 * getRateFromVND("USD"));
    }





}
