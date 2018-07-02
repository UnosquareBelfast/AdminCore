//package com.unosquare.admin_core.back_end.enums.converter;
//
//import com.unosquare.admin_core.back_end.enums.ContractStatus;
//
//import javax.persistence.AttributeConverter;
//import javax.persistence.Converter;
//
//@Converter
//public class ContractStatusConverter
//        implements AttributeConverter<ContractStatus, Integer> {
//
//    public Integer convertToDatabaseColumn(ContractStatus status) {
//        if (status == null) {
//            return null;
//        }
//
//        return status.getContractStatusId();
//    }
//
//    public ContractStatus convertToEntityAttribute(Integer id) {
//        if (id == null) {
//            return null;
//        }
//
//        return ContractStatus.fromId(id);
//    }
//}
