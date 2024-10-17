import schema from '../schemas/instances_output_schema.json' assert { type: 'json' }
import data from './aItem.json' assert { type: 'json' }
import { DicomMetaDictionary } from "../util/DicomMetaDictionary.js";

import Ajv from 'ajv'


// // 加载数据文件
// const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// // 加载Schema文件
// const schema = JSON.parse(fs.readFileSync('schema.json', 'utf8'));

// 初始化AJV实例
const ajv = new Ajv({ allErrors: true });

// 编译Schema
const validate = ajv.compile(schema);

// 验证数据
// const valid = validate(data);
// if (!valid) {
//   console.log('Validation errors:', validate.errors);
// } else {
  // 基于Schema生成新的JSON
  // 基于Schema生成新的JSON
  const result = {};
  for (let key in schema.items.properties) {
    if (data.hasOwnProperty(key)) {
      result[key] = data[key];
    } else {
      // 如果属性不存在，根据Schema生成默认值
      const propertySchema = schema.items.properties[key];
      if (propertySchema.type === 'object') {
        result[key] = {};
        for (let subKey in propertySchema.properties) {
          if (subKey === 'vr') {
            // 使用Schema中定义的固定值
            result[key][subKey] = propertySchema.properties[subKey].const;
          } else if (subKey === 'Value') {
            result[key][subKey] = propertySchema.properties[subKey].default || [];
          }
        }
      }
    }
  }

  console.log('Extracted JSON:', result);
  console.log(DicomMetaDictionary.naturalizeDataset(result));
// }
