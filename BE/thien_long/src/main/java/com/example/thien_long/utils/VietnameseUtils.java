package com.example.thien_long.utils;
import java.text.Normalizer;

public class VietnameseUtils {
    public static String removeVietnameseDiacritics(String input) {
        if (input == null) return null;
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        // Loại bỏ các dấu tiếng Việt
        String withoutDiacritics = normalized.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        // Chuyển đ/Đ thành d/D
        return withoutDiacritics.replaceAll("đ", "d").replaceAll("Đ", "D");
    }

    public static void main(String[] args) {
        System.out.println(VietnameseUtils.removeVietnameseDiacritics("Bút mực gel khô nhanh - nét viết êm mượt Flexgel Thiên Long GEL-042 - Dành cho Văn Phòng Sinh Viên Học sinh"));
    }
}

