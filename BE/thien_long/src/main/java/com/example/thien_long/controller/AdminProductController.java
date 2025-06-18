package com.example.thien_long.controller;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.dto.ProductDetailResponse;
import com.example.thien_long.dto.request.AdminProductDetailRequest;
import com.example.thien_long.dto.response.AdminProductDetailResponse;
import com.example.thien_long.dto.response.BasicAdminProductResponse;
import com.example.thien_long.exception.ProductNotFoundException;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.*;
import com.example.thien_long.service.Constant;
import com.example.thien_long.service.ProductService;
import com.example.thien_long.service.TranslationService;
import com.example.thien_long.service.UploadService;
import com.example.thien_long.utils.PriceUtils;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("api/v1/admin/products")
public class AdminProductController {
    @Autowired
    private AdminProductRepository adminProductRepository;

    @Autowired
    private ProductDetailRepository productDetailRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private TranslationService translationService;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SubCategoryRepository subCategoryRepository;
    @Autowired
    private BrandRepository brandRepository;

    @Autowired
    private UploadService uploadService;
    @Autowired
    private ProductRepository productRepository;


    @GetMapping("")
    public ResponseEntity<Page<BasicAdminProductResponse>> findAllCategory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            Locale locale) {

        System.out.println("admin/products"+"\tpage: " + page);
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<BasicAdminProductResponse> result = adminProductRepository.findByCategory(null,pageable);
        result = translate(result,locale);
        return ResponseEntity.ok(result);
    }

    //localhost:8080/api/v1/products/but-viet?sub=but-da-quang,but-chi&sortBy=price&direction=asc&page=0&size=10
    @GetMapping("/{categoryCode}")
    public ResponseEntity<Page<BasicAdminProductResponse>> findByCategory(
            @PathVariable String categoryCode,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "price") String sortBy,
            @RequestParam(defaultValue = "desc") String direction,
            Locale locale) {

        System.out.println("admin/products/"+categoryCode+"\tpage: " + page);
        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<BasicAdminProductResponse> result = adminProductRepository.findByCategory(categoryCode, pageable);
        result = translate(result,locale);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<AdminProductDetailResponse> findDetail(
            @PathVariable long id) {
        System.out.println("/products/detail/"+id);
        Locale locale = LocaleContextHolder.getLocale();
        Optional<Product> optionalProduct = adminProductRepository.findById(id);
        Product product = optionalProduct.orElseThrow(() -> new ProductNotFoundException("Không tìm thấy sản phẩm ID: " + id));

        Optional<List<ProductDetail>> optionalProductDetails = productDetailRepository.findByProductIdForProductDetail(id);
        List<ProductDetail> productDetails = optionalProductDetails.orElse(Collections.emptyList());

        List<Image> imgs = imageRepository.findByProductId(id);

        AdminProductDetailResponse result = new AdminProductDetailResponse(product,productDetails,imgs);
        String lang = locale.getLanguage();
//        if ("en".equals(lang)) {
//            String translatedName = translationService.getProductNameById(id,lang);
//            List<Long> detailIds = result.getProductDetails()
//                .stream()
//                .map(ProductDetail::getId)
//                .toList();
//            Map<Long,String> translatedDetailMap = translationService.getProductDetailByIds(detailIds,lang);
//            double currencyRate = PriceUtils.getRateFromVND(lang);
//            String translatedDescription = translationService.getProductDescriptionById(id,lang);
//            result.translateAndConvertCurrency(translatedName,
//                    translatedDetailMap,
//                    currencyRate,
//                    translatedDescription);
//        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/edit/base")
    public ResponseEntity<?> editBase(@RequestBody AdminProductDetailRequest request) {
        System.out.println("admin/products/edit");
        Product product = adminProductRepository.findById(request.getId()).get();
        product.setName(request.getName());
        product.setLabel(request.getLabel());
        product.setSoldQty(request.getTotalSoldQty());

        product.setDescription(request.getDescription());
        if(!product.getCategory().getCode().equals(request.getCategoryCode())){
            Category category = categoryRepository.findByCode(request.getCategoryCode()).get();
            product.setCategory(category);
        }
        if(!product.getSubCategory().getCode().equals(request.getSubCategoryCode())){
            SubCategory subCategory = subCategoryRepository.findByCode(request.getSubCategoryCode()).get();
            product.setSubCategory(subCategory);
        }
        if(!product.getBrand().getCode().equals(request.getBrandCode())){
            Brand brand = brandRepository.findByCode(request.getBrandCode()).get();
            product.setBrand(brand);
        }
        List<Image> imgs = imageRepository.findByProductId(product.getId());

        Optional<List<ProductDetail>> optionalProductDetails = productDetailRepository.findByProductIdForProductDetail(request.getId());
        List<ProductDetail> productDetails = optionalProductDetails.orElse(Collections.emptyList());


        if(product.getThumbnail().getId()!=request.getThumbnailId()){
            System.out.println("upload img id:" + request.getThumbnailId());
            Image thumbnail = imageRepository.findById(request.getThumbnailId()).get();
            product.setThumbnail(thumbnail);
        }

        Product productSaved = productRepository.save(product);

        AdminProductDetailResponse result = new AdminProductDetailResponse(productSaved,productDetails,imgs);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/edit/details")
    public ResponseEntity<?> editDetail(@RequestBody AdminProductDetailRequest request) {
        System.out.println("admin/products/edit");
        Product product = adminProductRepository.findById(request.getId()).get();
        product.setName(request.getName());
        product.setLabel(request.getLabel());
        product.setSoldQty(request.getTotalSoldQty());

        if(product.getThumbnail().getId()!=request.getThumbnailId()){
            Image image = new Image();
            image.setName(request.getThumbnailUrl());
            image = imageRepository.save(image);
            product.setThumbnail(image);
        }
        product.setDescription(request.getDescription());
        if(!product.getCategory().getCode().equals(request.getCategoryCode())){
            Category category = categoryRepository.findByCode(request.getCategoryCode()).get();
            product.setCategory(category);
        }
        if(!product.getSubCategory().getCode().equals(request.getSubCategoryCode())){
            SubCategory subCategory = subCategoryRepository.findByCode(request.getSubCategoryCode()).get();
            product.setSubCategory(subCategory);
        }
        if(!product.getBrand().getCode().equals(request.getBrandCode())){
            Brand brand = brandRepository.findByCode(request.getBrandCode()).get();
            product.setBrand(brand);
        }
//        Optional<List<ProductDetail>> optionalProductDetails = productDetailRepository.findByProductIdForProductDetail(request.getId());
//        List<ProductDetail> productDetails = optionalProductDetails.orElse(Collections.emptyList());
//
        Image thumbnail = imageRepository.findById(product.getThumbnail().getId()).get();
        product.setThumbnail(thumbnail);

        Product productSaved = productRepository.save(product);

        AdminProductDetailResponse result = new AdminProductDetailResponse(productSaved,null,null);
//        AdminProductDetailResponse result = new AdminProductDetailResponse(product,productDetails,imgs);

        return ResponseEntity.ok(result);
    }


//    @GetMapping("/search")
//    public ResponseEntity<Page<BasicProductResponse>> findByName(
//            @RequestParam(defaultValue = "") String keyword,
//            @RequestParam(required = false) String priceRange,
//
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "20") int size,
//            @RequestParam(defaultValue = "price") String sortBy,
//            @RequestParam(defaultValue = "desc") String direction,
//            Locale locale) {
//
//        System.out.println("products/search?keyword="+keyword);
//        Sort sort = Sort.by(Sort.Direction.fromString(direction), sortBy);
//        Pageable pageable = PageRequest.of(page, size, sort);
//
//        String[] tokens = keyword.split(" ");
//
//        ArrayList<String> keywords = new ArrayList<>();
//        for (String token : tokens) {
//            keywords.add(token);
//        }
//        String bfPrice = null, afPrice=null;
//        if (priceRange != null) {
//            String[] priceTokens = priceRange.split("-");
//            bfPrice = priceTokens[0]+"000";
//            afPrice = priceTokens[1]+"000";
//        }
//        Page<Product> productPage = productService.searchByKeywords(keywords, bfPrice, afPrice, pageable);
//        Page<BasicProductResponse> result = productPage.map(product ->
//                new BasicProductResponse(
//                        product.getId(),
//                        product.getName(),
//                        product.getLabel(),
//                        product.getThumbnail(),
//                        product.getPrice(),
//                        product.getInitPrice(),
//                        product.getAvgRating(),
//                        product.getTotalReview(),
//                        product.getSoldQty()
//                )
//        );
//        result = translate(result,locale);
//        return ResponseEntity.ok(result);
//    }

    public Page<BasicAdminProductResponse> translate(Page<BasicAdminProductResponse> page, Locale locale) {
        String lang = locale.getLanguage();
        if ("en".equals(lang)) {
            double currencyRate = PriceUtils.getRateFromVND(lang);
            List<Long> ids = page.getContent()        // List<BasicProductResponse>
                    .stream()
                    .map(BasicAdminProductResponse::getId)
                    .toList();

            Map<Long,String> translations = translationService.getProductByIds(ids,lang);
            if(!translations.isEmpty()) {
                page.getContent().forEach(item -> {
                    item.translate(translations);

                });
            }
        }
        return page;
    }


}




