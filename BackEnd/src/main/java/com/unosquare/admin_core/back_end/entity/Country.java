package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "Country")
@Embeddable
public class Country implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="countrySeq",sequenceName="country_country_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="countrySeq")
    @Column(name = "country_id", unique = true, nullable = false)
    private int countryId;

    @Column(name = "description")
    private String description;

    public Country(){

    }

    public Country(int countryId){
        this.countryId = countryId;
    }
}
