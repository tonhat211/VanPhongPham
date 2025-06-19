package com.example.thien_long.service;

public class Constant {
    public static final int NOT_DELETED = 0;
    public static final int DELETED = 1;

    public static final String PRODUCT_IMG_DIR = "uploads/images/products";
    public static final String THUMBNAIL_IMG_DIR = "uploads/images/thumbnails";
    public static final String ICON_IMG_DIR = "images/icons";
    public static final String UPLOAD_DIR = "uploads";

    public static final String THUMBNAIL_TYPE = "THUMBNAIL";

    // hash password
    public static String hashPassword(String password) {
        HashAlgorism hashAlgorism = new HashAlgorism();
        try {
            return hashAlgorism.hash(password);
        } catch (Exception e) {
            return "null";
        }
    }

    public static final String ADMIN_GRANT = "ADMIN";


}
