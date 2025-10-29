package com.flogin.repository;

import com.flogin.entity.ProductEntity;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.FluentQuery;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public interface ProductRepository extends JpaRepository<ProductEntity, Long> {
    @Override
    void flush();

    @Override
    <S extends ProductEntity> S saveAndFlush(S entity);

    @Override
    <S extends ProductEntity> List<S> saveAllAndFlush(Iterable<S> entities);

    @Override
    default void deleteInBatch(Iterable<ProductEntity> entities) {
        JpaRepository.super.deleteInBatch(entities);
    }

    @Override
    void deleteAllInBatch(Iterable<ProductEntity> entities);

    @Override
    void deleteAllByIdInBatch(Iterable<Long> longs);

    @Override
    void deleteAllInBatch();

    @Override
    ProductEntity getOne(Long aLong);

    @Override
    ProductEntity getById(Long aLong);

    @Override
    ProductEntity getReferenceById(Long aLong);

    @Override
    <S extends ProductEntity> Optional<S> findOne(Example<S> example);

    @Override
    <S extends ProductEntity> List<S> findAll(Example<S> example);

    @Override
    <S extends ProductEntity> List<S> findAll(Example<S> example, Sort sort);

    @Override
    <S extends ProductEntity> Page<S> findAll(Example<S> example, Pageable pageable);

    @Override
    <S extends ProductEntity> long count(Example<S> example);

    @Override
    <S extends ProductEntity> boolean exists(Example<S> example);

    @Override
    <S extends ProductEntity, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction);

    @Override
    <S extends ProductEntity> S save(S entity);

    @Override
    <S extends ProductEntity> List<S> saveAll(Iterable<S> entities);

    @Override
    Optional<ProductEntity> findById(Long aLong);

    @Override
    boolean existsById(Long aLong);

    @Override
    List<ProductEntity> findAll();

    @Override
    List<ProductEntity> findAllById(Iterable<Long> longs);

    @Override
    long count();

    @Override
    void deleteById(Long aLong);

    @Override
    void delete(ProductEntity entity);

    @Override
    void deleteAllById(Iterable<? extends Long> longs);

    @Override
    void deleteAll(Iterable<? extends ProductEntity> entities);

    @Override
    void deleteAll();

    @Override
    List<ProductEntity> findAll(Sort sort);

    @Override
    Page<ProductEntity> findAll(Pageable pageable);

    Page<ProductEntity> findAllByIsDeletedFalse(Pageable pageable);


}
