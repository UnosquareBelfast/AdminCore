package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.EventMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventMessageRepository extends JpaRepository<EventMessage, Integer> {
}
