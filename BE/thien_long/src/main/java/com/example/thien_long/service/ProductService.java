package com.example.thien_long.service;

import com.example.thien_long.model.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @PersistenceContext
    private EntityManager entityManager;

    public Page<com.example.thien_long.model.Product> searchByKeywords(List<String> keywords, String bfPrice, String afPrice, Pageable pageable) {
        StringBuilder sql = new StringBuilder("SELECT * FROM products WHERE is_deleted = 0");

        for (int i = 0; i < keywords.size(); i++) {
            sql.append(" AND (LOWER(unsigned_name) LIKE :kw")
                    .append(i)
                    .append(" OR LOWER(name) LIKE :kw")
                    .append(i)
                    .append(")");
        }
        if(bfPrice != null && afPrice != null) {
            sql.append(" AND price BETWEEN :bfPrice AND :afPrice");
        }

        Query query = entityManager.createNativeQuery(sql.toString(), Product.class);
        for (int i = 0; i < keywords.size(); i++) {
            String keywordParam = "%" + keywords.get(i).toLowerCase() + "%";
            query.setParameter("kw" + i, keywordParam);
        }
        if(bfPrice != null && afPrice != null) {
            query.setParameter("bfPrice", bfPrice);
            query.setParameter("afPrice", afPrice);

        }

        // Phân trang
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Product> resultList = query.getResultList();

        // Đếm tổng kết quả
        StringBuilder countSql = new StringBuilder("SELECT COUNT(*) FROM products WHERE is_deleted = 0");

        for (int i = 0; i < keywords.size(); i++) {
            countSql.append(" AND (LOWER(unsigned_name) LIKE :kw")
                    .append(i)
                    .append(" OR LOWER(name) LIKE :kw")
                    .append(i)
                    .append(")");
        }
        if(bfPrice != null && afPrice != null) {
            countSql.append(" AND price BETWEEN :bfPrice AND :afPrice");
        }

        Query countQuery = entityManager.createNativeQuery(countSql.toString());
        for (int i = 0; i < keywords.size(); i++) {
            String keywordParam = "%" + keywords.get(i).toLowerCase() + "%";
            countQuery.setParameter("kw" + i, keywordParam);
        }
        if(bfPrice != null && afPrice != null) {
            countQuery.setParameter("bfPrice", bfPrice);
            countQuery.setParameter("afPrice", afPrice);

        }

        long total = ((Number) countQuery.getSingleResult()).longValue();

        return new PageImpl<>(resultList, pageable, total);
    }
}
