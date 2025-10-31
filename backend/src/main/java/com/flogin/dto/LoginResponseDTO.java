package com.flogin.dto;

public class LoginResponseDTO {
    private boolean status;
    private String message;
    private String token;

    public LoginResponseDTO(){

    }

    public LoginResponseDTO(boolean status, String message, String token) {
        this.status = status;
        this.message = message;
        this.token = token;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
