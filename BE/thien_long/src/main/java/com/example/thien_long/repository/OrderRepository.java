package com.example.thien_long.repository;

import com.example.thien_long.dto.response.OrderItemResponse;
import com.example.thien_long.dto.response.OrderResponse;
import com.example.thien_long.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

        @Query("""
        SELECT new com.example.thien_long.dto.response.OrderResponse (
        o.id, o.createdAt, o.updatedAt,o.initMoney, o.payedMoney,o.status,o.receiverInfo)
        FROM Order o
        WHERE o.user.id=:id ORDER BY o.createdAt DESC
        """)
        List<OrderResponse> findByUserId(@Param("id") long id);

        @Query("""
        SELECT new com.example.thien_long.dto.response.OrderResponse (
        o.id, o.createdAt, o.updatedAt,o.initMoney, o.payedMoney,o.status,o.receiverInfo)
        FROM Order o
        WHERE o.id=:id
        """)
        OrderResponse findOrderResponseById(@Param("id") long id);
}
