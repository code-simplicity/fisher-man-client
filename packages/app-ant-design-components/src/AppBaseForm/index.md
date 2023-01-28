---
toc: content
title: AppBaseForm基础表单
order: 6
group:
  title: 通用
---

# AppProForm 组件

## 基本介绍

基础表单是通过二次开发 **antd** 的 **Form** 组件开发。

## 例子

### 基本使用

<code src="./demos/base.tsx">基本表单使用</code>

<code src="./demos/drawer-form.tsx">基础的弹窗表单</code>

## AppProFormInstance

超级表单的实例

参考 antd，不过我们这里内置了实例的方法，集成了一些方法进行表单数据的读取和设置。

```js
      /**
       * 获取格式化之后的数据
       * @param allData boolean
       */
      getFieldsFormatValue: (allData?: true) =>
        transformKey(getFormInstance()?.getFieldsValue(allData!), omitNil),
      /**
       * 获取格式化之后的单个数据
       * @param paramsNameList
       */
      getFieldFormatValue: (paramsNameList: NamePath = []) => {
        const nameList = covertFormName(paramsNameList);
        if (!nameList) throw new Error('nameList不能为空');
        // nameList!是作为非空判断，这里就一个语法而已
        const value = getFormInstance().getFieldValue(nameList!);
        const obj = nameList ? Set({}, nameList as string[], value) : value;
        return get(transformKey(obj, omitNil, nameList), nameList as string[]);
      },
      /**
       * 获取格式化之后的单个数据
       * 获取的值为 {key： {key： value}}
       * @param paramsNameList
       */
      getFieldFormatValueObject: (paramsNameList?: NamePath) => {
        const nameList = covertFormName(paramsNameList);
        const value = getFormInstance()?.getFieldValue(nameList!);
        const obj = nameList ? Set({}, nameList as string[], value) : value;
        return transformKey(obj, omitNil, nameList);
      },
      /**
       * 验证字段之后返回格式化之后的所有数据
       * @param nameList (string|number[])
       */
      validateFieldsReturnFormatValue: async (nameList?: NamePath[]) => {
        if (nameList && Array.isArray(nameList))
          throw new Error('nameList必须是一个数组');
        const values = await getFormInstance().validateFields(nameList);
        // 转换完成的
        const transformedKey = transformKey(values, omitNil);
        return transformedKey ? transformedKey : {};
      }
```

## AppProForm APi

AppProForm 是参考 `pro-components` 进行封装的，其实就是感觉他的组件库设计确实是很好的。 和 `antd Form` 开发模式一样，可以继续使用 `FormItem` 进行开发，基本上都直接可以参考 `Form` 表单的开发模式。

<API id="AppBaseForm"></API>

| 参数     | 说明   | 类型        | 默认值           |
| -------- | ------ | ----------- | ---------------- |
| children | 子节点 | `ReactNode` | `()=> ReactNode` |
