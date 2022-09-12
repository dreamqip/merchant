import createSchema from 'part:@studio/base/schema-creator'
import schemaTypes from 'all:part:@studio/base/schema-type'

import product from "./product";
import banner from "./banner";

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([product, banner]),
})
