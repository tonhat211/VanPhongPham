package com.example.thien_long.service;

import com.example.thien_long.repository.MenuTranslationRepository;
import com.example.thien_long.repository.ProductDescriptionTranslationRepository;
import com.example.thien_long.repository.ProductDetailTranslationRepository;
import com.example.thien_long.repository.ProductTranslationRepository;
import com.example.thien_long.translation.MenuTranslation;
import com.example.thien_long.translation.ProductDescriptionTranslation;
import com.example.thien_long.translation.ProductDetailTranslation;
import com.example.thien_long.translation.ProductTranslation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TranslationService {
    @Autowired
    private MenuTranslationRepository menuTranslationRepository;

    @Autowired
    private ProductTranslationRepository productTranslationRepository;

    @Autowired
    private ProductDetailTranslationRepository productDetailTranslationRepository;

    @Autowired
    private ProductDescriptionTranslationRepository productDescriptionTranslationRepository;

    public Map<String,String> getMenuByCodes(List<String> codes, String lang) {
        List<MenuTranslation> menus = menuTranslationRepository.findByCodeList(codes,lang);
        Map<String, String> map = menus.stream()
                .collect(Collectors.toMap(
                        MenuTranslation::getObjectCode,
                        MenuTranslation::getContent,
                        (v1, v2) -> v1,
                        LinkedHashMap::new
                ));
        return map;
    }

    public Map<Long,String> getProductByIds(List<Long> ids, String lang) {
        List<ProductTranslation> menus = productTranslationRepository.findByProductIdList(ids,lang);
        Map<Long, String> map = menus.stream()
                .collect(Collectors.toMap(
                        ProductTranslation::getProductId,
                        ProductTranslation::getContent,
                        (v1, v2) -> v1,
                        LinkedHashMap::new
                ));
        return map;
    }

    public Map<Long,String> getProductDetailByIds(List<Long> ids, String lang) {
        List<ProductDetailTranslation> menus = productDetailTranslationRepository.findByProductDetailIdList(ids,lang);
        Map<Long, String> map = menus.stream()
                .collect(Collectors.toMap(
                        ProductDetailTranslation::getProductDetailId,
                        ProductDetailTranslation::getContent,
                        (v1, v2) -> v1,
                        LinkedHashMap::new
                ));
        return map;
    }

    public String getProductDescriptionById(long id, String lang) {
        ProductDescriptionTranslation re = productDescriptionTranslationRepository.findByProductId(id,lang);
        if(re!=null) return re.getContent();
        else return null;
    }

    public String getProductNameById(long id, String lang) {
        ProductTranslation re = productTranslationRepository.findByProductId(id,lang);
        if(re!=null) return re.getContent();
        else return null;
    }

}
