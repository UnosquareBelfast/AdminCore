package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.EventMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface EventMessageRepository extends JpaRepository<EventMessage, Integer> {
    @Query(value = "SELECT em FROM EventMessage em " +
            "JOIN em.events e " +
            "WHERE " +
            "e.groupId = :groupId"
    )
    List<EventMessage> findEventMessagesByGroupId(@Param("groupId") UUID groupId);

    @Query(value = "SELECT em FROM EventMessage em " +
            "JOIN em.events e " +
            "WHERE " +
            "e.groupId = :groupId " +
            "AND " +
            "em.lastModified = (" +
            "SELECT MAX(e.lastModified) " +
            "FROM EventMessage em " +
            "JOIN em.events ev " +
            "WHERE ev.groupId = :groupId " +
            "AND em.eventMessageType.eventMessageTypeId = 2 ) "
    )
    EventMessage findLatestEventMessagesByGroupId(@Param("groupId") UUID groupId);
}
