package com.example.thien_long.controller;

import com.example.thien_long.dto.response.UploadResponse;
import com.example.thien_long.model.Image;
import com.example.thien_long.service.Constant;
import com.example.thien_long.service.UploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/files")
public class FileController {
    @Autowired
    private UploadService uploadService;

    @PostMapping(path = "/upload/thumbnail", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UploadResponse> uploadThumbnail(@RequestPart("file") MultipartFile file
                                              )
            throws IOException {
        System.out.println("files/upload");
        String dir ="";
//        switch (type) {
//            case Constant.THUMBNAIL_TYPE: dir=Constant.THUMBNAIL_IMG_DIR; break;
//        }
        Image saved = uploadService.save(file,Constant.THUMBNAIL_IMG_DIR,0);
        UploadResponse uploadResponse = new UploadResponse();
        uploadResponse.setId(saved.getId());
        uploadResponse.setName(saved.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(uploadResponse);
    }

    @PostMapping(
            path = "/upload/images",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<List<UploadResponse>> uploadThumbnails(
            @RequestPart("files") MultipartFile[] files) throws IOException {

        System.out.println("files/upload (" + files.length + " files)");

        List<UploadResponse> result = new ArrayList<>();
        int index=0;
        for (MultipartFile file : files) {

            Image saved = uploadService.save(file, Constant.THUMBNAIL_IMG_DIR,index);
            index++;
            UploadResponse resp = new UploadResponse();
            resp.setId(saved.getId());
            resp.setName(saved.getName());
            result.add(resp);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }


    private void makeDirectoryIfNotExist(String imageDirectory) {
        try {
            Files.createDirectories(Paths.get(imageDirectory));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
