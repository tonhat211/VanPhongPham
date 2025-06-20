package com.example.thien_long.controller;

import com.example.thien_long.dto.BasicProductResponse;
import com.example.thien_long.dto.ProductDetailResponse;
import com.example.thien_long.dto.request.AdminProductDetailRequest;
import com.example.thien_long.dto.response.AdminProductDetailResponse;
import com.example.thien_long.dto.response.BasicAdminProductResponse;
import com.example.thien_long.dto.response.UploadResponse;
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
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
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

    @Autowired
    private EntityManager entityManager;

    @PreAuthorize("hasAuthority('ADMIN_PRODUCT')")
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
    @PreAuthorize("hasAuthority('ADMIN_PRODUCT')")
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

    @PreAuthorize("hasAuthority('ADMIN_PRODUCT')")
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

    @PreAuthorize("hasAuthority('EDIT_PRODUCT')")
    @PostMapping("/edit/base")
    public ResponseEntity<?> editBase(@RequestBody AdminProductDetailRequest request) {
        System.out.println("admin/products/edit");
//        id, name, label, description, categoryCode, subCategoryCode, brandCode
        Product product = adminProductRepository.findById(request.getId()).get();
        if (request.getName() != null) product.setName(request.getName());
        if (request.getLabel() != null) product.setLabel(request.getLabel());
//        if (!request.getDescription().equals(Constant.NULL_VALUE)) product.setDescription(request.getDescription());

        if(request.getCategoryCode()!= null &&
                product.getCategory()!=null &&
                !request.getCategoryCode().equals(product.getCategory().getCode())) {
            Category category = categoryRepository.findByCode(request.getCategoryCode()).get();
            product.setCategory(category);
        }
        if(request.getSubCategoryCode() != null &&
                product.getSubCategory()!=null &&
                !request.getSubCategoryCode().equals(product.getSubCategory().getCode())) {
            SubCategory subCategory = subCategoryRepository.findByCode(request.getSubCategoryCode()).get();
            product.setSubCategory(subCategory);
        }
        if(request.getBrandCode() != null &&
                product.getBrand()!=null &&
                !request.getBrandCode().equals(product.getBrand().getCode())) {
            Brand brand = brandRepository.findByCode(request.getBrandCode()).get();
            product.setBrand(brand);
        }

        Product productSaved = productRepository.save(product);

        AdminProductDetailResponse result = new AdminProductDetailResponse(productSaved,null,null);

        Map<String, Object> re = new HashMap<>();
        re.put("success", true);
        re.put("base", result);

        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('EDIT_PRODUCT')")
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

    @PreAuthorize("hasAuthority('EDIT_PRODUCT')")
    @PostMapping("/edit/image/delete")
    public ResponseEntity<?> deleteImg(@RequestBody AdminProductDetailRequest request) {
        System.out.println("edit/image/delete");
        long imgId = request.getImgId();
        boolean isSuccess = false;

        Optional<Product>  optP = adminProductRepository.findById(request.getId());
        Optional<Image>    optI = imageRepository.findById(imgId);

        if (optP.isPresent() && optI.isPresent()) {
            Product product = optP.get();
            Image   image   = optI.get();
            product.getImages().remove(image);   // owner
            image.getProducts().remove(product);
            Product saved = adminProductRepository.saveAndFlush(product);
            entityManager.detach(image);
            image = imageRepository.findById(imgId).orElseThrow();

            if (image.getId()!=1 && image.getProducts().isEmpty()) {
                try {
                    imageRepository.delete(image);
                    FileController.delete(image.getName(), Constant.PRODUCT_IMG_DIR);
                } catch (DataIntegrityViolationException ex) {
                    System.out.println("image van con FK - con dung -> khong xoa trong file");
                }
            }
            List<Image> imgs = saved.getImages();
            boolean checkImgExists = false;
            for(Image img : imgs){
                System.out.println("anh cua saved");
                if(imgId == img.getId()) {
                    checkImgExists = true;
                    break;
                }
            }
            isSuccess = !checkImgExists;
        }

        Map<String, Object> re = new HashMap<>();
        if(isSuccess) {
            re.put("imgId", imgId);
        }
        re.put("success", isSuccess);

        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('EDIT_PRODUCT')")
    @PostMapping(path = "/edit/image/insert" ,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> insertImg(@RequestPart("files") MultipartFile[] files,
                                       @RequestPart("id") String id) throws IOException {
        System.out.println("edit/image/insert: product id: " + id);
        System.out.println("edit/image/insert: file len: " + files.length);
        for(MultipartFile file : files){
            System.out.println(file.getName());
        }
        long numId = Long.parseLong(id);
        List<Image> addedImages = new ArrayList<>();
        int index=0;
        for (MultipartFile file : files) {
            Image saved = uploadService.save(file, Constant.PRODUCT_IMG_DIR,index);
            index++;
            Image img = new Image();
            img.setId(saved.getId());
            img.setName(saved.getName());
            addedImages.add(saved);
        }
        Product product = adminProductRepository.findById(numId).get();
        int oldLen = product.getImages().size();
        product.getImages().addAll(addedImages);
        Product saved = adminProductRepository.saveAndFlush(product);
        List<Image> response = new ArrayList<>();
        for(Image img : addedImages){
            Image i = new Image();
            i.setId(img.getId());
            i.setName(Constant.PRODUCT_IMG_DIR +"/" +img.getName());
            response.add(i);
        }
        boolean isSuccess = false;
        if(saved.getImages().size() > oldLen){
            isSuccess = true;
        }
        Map<String, Object> re = new HashMap<>();
        if(isSuccess) {
            re.put("images", response);
        }
        re.put("success", isSuccess);

        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('EDIT_PRODUCT')")
    @PostMapping("/edit/thumbnail/delete")
    public ResponseEntity<?> deleteThumb(@RequestBody AdminProductDetailRequest request) {
        System.out.println("edit/thumbnail/delete");
        boolean isSuccess = false;

        Optional<Product>  optP = adminProductRepository.findById(request.getId());
        Image defaultImg = imageRepository.findById(1L).get();

        if (optP.isPresent()) {
            Product product = optP.get();
            long imgId = product.getThumbnail().getId();
            Image image = imageRepository.findById(imgId).orElse(null);
            product.setThumbnail(defaultImg);   // owner
            Product saved = adminProductRepository.saveAndFlush(product);

            if (image!=null && image.getId()!=1 && image.getProducts().isEmpty()) {
                try {
                    imageRepository.delete(image);
                    FileController.delete(image.getName(), Constant.PRODUCT_IMG_DIR);
                } catch (DataIntegrityViolationException ex) {
                    System.out.println("image van con FK - con dung -> khong xoa trong file");
                }
            }
            Image thumbnail = saved.getThumbnail();
            if(1==thumbnail.getId()) {
                System.out.println("da thiet lap default thumb");
                isSuccess = true;
            }
        }

        Map<String, Object> re = new HashMap<>();
        if(isSuccess) {
            defaultImg.setProducts(null);
            defaultImg.setName(Constant.THUMBNAIL_IMG_DIR+"/"+defaultImg.getName());
            re.put("thumbnail", defaultImg);
        }
        re.put("success", isSuccess);

        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('EDIT_PRODUCT')")
    @PostMapping(path = "/edit/thumbnail/insert" ,
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> insertThumb(@RequestPart("file") MultipartFile file,
                                       @RequestPart("id") String id) throws IOException {
        System.out.println("edit/thumbnail/insert: product id: " + id);
        System.out.println("edit/thumbnail/insert: file len: ");
        long numId = Long.parseLong(id);
        Image saved = uploadService.save(file, Constant.THUMBNAIL_IMG_DIR,0);
        Product product = adminProductRepository.findById(numId).get();
        long oldThumbId = product.getThumbnail().getId();
        product.setThumbnail(saved);
        Product savedP = adminProductRepository.saveAndFlush(product);
        long newThumbId = savedP.getThumbnail().getId();
        boolean isSuccess = false;
        if(oldThumbId!=newThumbId){
            isSuccess = true;
        }
        Map<String, Object> re = new HashMap<>();
        if(isSuccess) {
            Image response = new Image();
            response.setId(saved.getId());
            response.setName(Constant.THUMBNAIL_IMG_DIR +"/" +saved.getName());
            re.put("image", response);
        }

        re.put("success", isSuccess);

        return ResponseEntity.ok(re);
    }


    @PreAuthorize("hasAuthority('DELETE_PRODUCT')")
    @PostMapping("/edit/detail/delete")
    public ResponseEntity<?> deleteDetail(@RequestBody AdminProductDetailRequest request) {
        System.out.println("edit/detail/delete");
        long detailId = request.getDetailId();

        boolean isSuccess = false;
        Map<String, Object> re = new HashMap<>();

//        Optional<Product>  optP = adminProductRepository.findById(request.getId());
        Optional<ProductDetail> optDetail = productDetailRepository.findById(detailId);
        if(optDetail.isPresent()) {
            ProductDetail productDetail = optDetail.get();
            productDetail.setIsDeleted(1);
            ProductDetail saved = productDetailRepository.save(productDetail);
            isSuccess = true;
            re.put("detailId", saved.getId());
        }

        re.put("success", isSuccess);
        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('EDIT_PRODUCT')")
    @PostMapping("/edit/detail")
    public ResponseEntity<?> updateDetail(@RequestBody AdminProductDetailRequest request) {
        System.out.println("edit/detail/update");
        // title, initPrice, price, qty
        long detailId = request.getDetailId();
        double initPrice = request.getInitPrice();
        double price = request.getPrice();
        int qty = request.getQty();
        String title = request.getTitle();

        boolean isSuccess = false;
        Map<String, Object> re = new HashMap<>();

//        Optional<Product>  optP = adminProductRepository.findById(request.getId());
        Optional<ProductDetail> optDetail = productDetailRepository.findById(detailId);
        if(optDetail.isPresent()) {
            ProductDetail productDetail = optDetail.get();
            productDetail.setTitle(title);
            productDetail.setInitPrice(initPrice);
            productDetail.setPrice(price);
            productDetail.setQty(qty);
            ProductDetail saved = productDetailRepository.save(productDetail);
            isSuccess = true;
            ProductDetail response = new ProductDetail();
            response.setId(saved.getId());
            response.setTitle(saved.getTitle());
            response.setInitPrice(saved.getInitPrice());
            response.setPrice(saved.getPrice());
            response.setQty(saved.getQty());
            re.put("detail", response);
        }
        re.put("success", isSuccess);
        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('ADD_PRODUCT')")
    @PostMapping("/add/detail")
    public ResponseEntity<?> addDetail(@RequestBody AdminProductDetailRequest request) {
        System.out.println("add/detail");
        // title, initPrice, price, qty
        long id = request.getId();
        double initPrice = request.getInitPrice();
        double price = request.getPrice();
        int qty = request.getQty();
        String title = request.getTitle();

        boolean isSuccess = false;
        Map<String, Object> re = new HashMap<>();
        ProductDetail productDetail = new ProductDetail();
//        productDetail.setId(id);
        productDetail.setTitle(title);
        productDetail.setInitPrice(initPrice);
        productDetail.setPrice(price);
        productDetail.setQty(qty);
        productDetail.setProduct(adminProductRepository.findById(id).get());
        ProductDetail saved = productDetailRepository.saveAndFlush(productDetail);

        isSuccess = true;
        ProductDetail response = new ProductDetail();
        response.setId(saved.getId());
        response.setTitle(saved.getTitle());
        response.setInitPrice(saved.getInitPrice());
        response.setPrice(saved.getPrice());
        response.setQty(saved.getQty());
        re.put("detail", response);
        re.put("success", isSuccess);
        return ResponseEntity.ok(re);
    }

    @PreAuthorize("hasAuthority('EDIT_PRODUCT_STATUS')")
    @PostMapping("/edit/status")
    public ResponseEntity<?> editStatus(@RequestBody AdminProductDetailRequest request) {
        System.out.println("admin/products/edit/status: " +request.getStatus());
        Product product = adminProductRepository.findById(request.getId()).get();
        String newStatus = request.getStatus();
        if("DELETE".equals(newStatus)) {
            product.setIsDeleted(1);
        } else product.setStatus(request.getStatus());

        Product productSaved = adminProductRepository.save(product);

        Map<String, Object> re = new HashMap<>();
        re.put("success", true);
        re.put("id", productSaved.getId());
        re.put("status", productSaved.getStatus());

        return ResponseEntity.ok(re);
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




