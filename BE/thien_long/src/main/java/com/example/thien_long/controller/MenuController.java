package com.example.thien_long.controller;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.dto.MenuResponse;
import com.example.thien_long.model.Brand;
import com.example.thien_long.model.Category;
import com.example.thien_long.model.SubCategory;
import com.example.thien_long.repository.BrandRepository;
import com.example.thien_long.repository.CategoryRepository;
import com.example.thien_long.repository.ProductRepository;
import com.example.thien_long.repository.SubCategoryRepository;
import com.example.thien_long.service.OrderService;
import com.example.thien_long.service.TranslationService;
import com.example.thien_long.translation.MenuTranslation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/menu")
public class MenuController {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;
    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private TranslationService translationService;

    @PostMapping("data")
    public ResponseEntity<List<MenuResponse>> findAllPrimary(@RequestParam(defaultValue = "1") int level, Locale locale) {
        System.out.println("/menu/data");

        List<Category> categories = categoryRepository.findAllByLevel(level);
        List<MenuResponse> res = new ArrayList<>();
        List<SubCategory> subs = subCategoryRepository.findAll();
        Map<Category, List<SubCategory>> groupedSub = subs.stream()
                .collect(Collectors.groupingBy(SubCategory::getCategory, LinkedHashMap::new, Collectors.toList()));
        for (Category c : categories) {
            res.add(new MenuResponse(c, groupedSub.get(c)));
        }
        String lang = locale.getLanguage(); // "vi", "en"
        if ("en".equals(lang)) {
            List<String> codes = new ArrayList<>();
            for (MenuResponse m : res) {
                codes.add(m.getLink());
                if(m.getSubs()!=null) {
                    for(SubCategory sub : m.getSubs()) {
                        codes.add(sub.getCode());
                    }
                }
            }
            Map<String,String> translations = translationService.getMenuByCodes(codes,lang);
            if(!translations.isEmpty()) {
                for (MenuResponse m : res) {
                    m.translate(translations);
                }
            }


        }
        return ResponseEntity.ok(res);
    }

    @PostMapping("brands")
    public ResponseEntity<List<Brand>> findAllBrand() {
        System.out.println("/menu/brands");
        List<Brand> res = brandRepository.findAll();
        return ResponseEntity.ok(res);
    }



}

