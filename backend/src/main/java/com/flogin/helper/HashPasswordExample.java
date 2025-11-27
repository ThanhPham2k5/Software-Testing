package com.flogin.helper;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class HashPasswordExample {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashed = encoder.encode("@John123");
        System.out.println(hashed);
    }
}
