package com.example.thien_long.repository;

import com.example.thien_long.dto.response.OrderItemResponse;
import com.example.thien_long.model.Order;
import com.example.thien_long.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    @Query("""
    SELECT new com.example.thien_long.dto.response.OrderItemResponse (
        ot.id, ot.order.id, ot.productDetail.product.id, ot.productDetail.product.name, 
        ot.productDetail.title, ot.qty, ot.productDetail.product.thumbnail.url,
        ot.priceUnit)
    FROM OrderItem ot
    WHERE ot.order.id=:id
    """)
    List<OrderItemResponse> findByOrderId(@Param("id") long id);

    @Query("""
    SELECT new com.example.thien_long.dto.response.OrderItemResponse (
        ot.id, ot.order.id, ot.productDetail.product.id, ot.productDetail.product.name, 
        ot.productDetail.title, ot.qty, ot.productDetail.product.thumbnail.url,
        ot.priceUnit)
    FROM OrderItem ot
    WHERE ot.order.id IN :ids 
    ORDER BY ot.id
    """)
    List<OrderItemResponse> findByOrderIds(@Param("ids") List<Long> ids);


}
