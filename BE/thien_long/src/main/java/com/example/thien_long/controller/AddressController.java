package com.example.thien_long.controller;

import com.example.thien_long.dto.request.AddressRequest;
import com.example.thien_long.dto.response.AddressResponse;
import com.example.thien_long.model.*;
import com.example.thien_long.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/addresses")
public class AddressController {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    AreaRepository areaRepository;

    @PostMapping("/user")
    public ResponseEntity<?> findByUser(@RequestBody AddressRequest request) {
        List<Address> addresses = addressRepository.findByUserId(request.getUserId());
        List<String> codes = new ArrayList<>();
        for(Address a : addresses) {
            codes.add(a.getProvince());
            codes.add(a.getWard());
        }
        List<Area> areas = areaRepository.findByCodes(codes);
        Map<String, Object> re = new HashMap<>();
        re.put("addresses", addresses);
        re.put("areas",areas);
        return ResponseEntity.ok(re);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addAddress(@RequestBody AddressRequest request) {
        Address address = new Address();
        User user = new User(); user.setId(request.getUserId());
        address.setUser(user);
        address.setName(request.getName());
        address.setPhone(request.getPhone());
        address.setProvince(request.getProvince());
        address.setWard(request.getWard());
        address.setDetail(request.getDetail());

        if(request.getIsDefault()==1) addressRepository.resetDefaultAddresses(request.getUserId());
        address.setIsDefault(request.getIsDefault());

        addressRepository.save(address);

        List<Address> addresses = addressRepository.findByUserId(request.getUserId());
        List<String> codes = new ArrayList<>();
        for(Address a : addresses) {
            codes.add(a.getProvince());
            codes.add(a.getWard());
        }
        List<Area> areas = areaRepository.findByCodes(codes);
        Map<String, Object> re = new HashMap<>();
        re.put("addresses", addresses);
        re.put("success", true);
        re.put("message", "Them dia chi thanh cong");
        re.put("areas",areas);

        return ResponseEntity.ok(re);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateAddress(@RequestBody AddressRequest request) {
        boolean isSuccess = false;
        Map<String, Object> re = new HashMap<>();

        Optional<Address> optionalAddress = addressRepository.findById(request.getId());
        if (optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            address.setName(request.getName());
            address.setPhone(request.getPhone());
            address.setProvince(request.getProvince());
            address.setWard(request.getWard());
            address.setDetail(request.getDetail());
            if(request.getIsDefault()==1) addressRepository.resetDefaultAddresses(request.getUserId());
            address.setIsDefault(request.getIsDefault());

            addressRepository.save(address);
            isSuccess = true;
            re.put("message", "Cap nhat dia chi thanh cong");
        } else {
            re.put("message", "Dia chi khong ton tai");
        }

        List<Address> addresses = addressRepository.findByUserId(request.getUserId());
        List<String> codes = new ArrayList<>();
        for(Address a : addresses) {
            codes.add(a.getProvince());
            codes.add(a.getWard());
        }
        List<Area> areas = areaRepository.findByCodes(codes);
        re.put("addresses", addresses);
        re.put("success", isSuccess);
        re.put("areas", areas);

        return ResponseEntity.ok(re);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteAddress(@RequestBody AddressRequest request) {
        boolean isSuccess = false;
        Map<String, Object> re = new HashMap<>();
        Optional<Address> optionalAddress = addressRepository.findById(request.getId());
        if (optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            if(address.getIsDefault()==1) {
                re.put("message", "Khong the xoa dia chi Mac dinh");
            } else {
                address.setIsDeleted(1);
                addressRepository.save(address);
                isSuccess = true;
                re.put("message", "Xoa dia chi thanh cong");
            }
        } else {
            re.put("message", "Dia chi khong ton tai");
        }

        List<Address> addresses = addressRepository.findByUserId(request.getUserId());
        re.put("addresses", addresses);
        re.put("success", isSuccess);

        return ResponseEntity.ok(re);
    }

    @GetMapping("/provinces")
    public ResponseEntity<?> getProvince() {
        System.out.println("get provinces");
        boolean isSuccess = false;
        List<Area> provinces = areaRepository.findProvinces();
        List<Area> wards = areaRepository.findWards(null);

        Map<String,List<Area>> wardsByProvinceCode = wards.stream()
                .collect(Collectors.groupingBy(item -> item.getParent().getCode()));
        for (Area a : provinces) {
            List<Area> temp = wardsByProvinceCode.getOrDefault(a.getCode(), new ArrayList<>());
            a.setChildren(temp);
        }
        return ResponseEntity.ok(provinces);
    }

    @GetMapping("/wards")
    public ResponseEntity<?> getWard(@RequestParam(required = false) String provinceCode) {
        if("".equals(provinceCode)) provinceCode = null;
        System.out.println("get ward: provinceCode= " + provinceCode );
        boolean isSuccess = false;
        List<Area> wards = areaRepository.findWards(provinceCode);
        return ResponseEntity.ok(wards);
    }





}




