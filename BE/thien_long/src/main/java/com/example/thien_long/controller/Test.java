package com.example.thien_long.controller;

public class Test {
    public static void main(String[] args) {
        String s1 = "but-viet";
        int index = s1.indexOf("/");
        String ss1 = "";
        String ss2 ="";
        if(index!=-1) {
            ss1 = s1.substring(0, index);
            ss2 = s1.substring(index,s1.length());
        } else {
            ss1 = s1;
        }
        System.out.println(ss1);

        System.out.println(ss2);
    }
}
