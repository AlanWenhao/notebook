# 位置匹配

## 什么是位置匹配，位置匹配的注意点
位置（锚）指的是相邻字符之间的位置
- 注意
    - 位置可以替换成字符


## 如何匹配位置
ES5中共有6个锚
- `^` 开始位置
- `$` 结束位置
- `\b` 词边界
- `\B` 非词边界
- `(?=p)` 
- `(?|p)`

### ^ 和 $
- ^(脱字符)匹配开头，在多行匹配中匹配行开头。
- $(美元符号)匹配结尾，在多行匹配中匹配行结尾。

