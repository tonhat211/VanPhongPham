package com.example.thien_long.service;

import com.example.thien_long.model.Image;
import com.example.thien_long.repository.ImageRepository;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class UploadService {
//    @Value("${file.upload-dir}")      // ví dụ uploads/images
    private String uploadDir = Constant.UPLOAD_DIR;

    @Autowired
    private ImageRepository imageRepository;

    public Image save(MultipartFile file,String dir,int index) throws IOException {
        // 1. Tạo folder theo tháng ngay gio phu giay cho gọn
        String imgName = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) +index;

        makeDirectoryIfNotExist(Constant.THUMBNAIL_IMG_DIR);
        Path thumbnailDirPath = Paths.get(dir);

        String ext = FilenameUtils.getExtension(file.getOriginalFilename());
        String newName = imgName + "." + ext;
        Path savedPath = thumbnailDirPath.resolve(newName);

        // 3. Ghi file
        Files.write(savedPath, file.getBytes());

        // 4. Lưu DB
//        String url = "/uploads/" + datePath + "/" + newName; // FE sẽ dùng
        Image img = new Image();
        img.setName(newName);

        return imageRepository.save(img);
    }

    private void makeDirectoryIfNotExist(String imageDirectory) {
        try {
            Files.createDirectories(Paths.get(imageDirectory));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

