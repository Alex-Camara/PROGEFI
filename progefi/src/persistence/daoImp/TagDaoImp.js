"use strict";

const Tag = require("../models/Tag");

class TagDaoImp {
  async save(tag) {
    let createdTag = await Tag.query()
      .insert({
        tagName: tag.tagName,
        tagBefore: tag.tagBefore,
        tagAfter: tag.tagAfter,
        fontSize: tag.fontSize,
        fontWeight: tag.fontWeight,
        fontStyle: tag.fontStyle,
        textAlignment: tag.textAlignment,
        model: tag.model,
        modelAttribute: tag.modelAttribute,
        backgroundColor: tag.backgroundColor,
        exampleValue: tag.exampleValue,
        draggable: tag.draggable,
        resizable: tag.resizable,
        isStatic: tag.isStatic,
        h: tag.h,
        w: tag.w,
        x: tag.x,
        y: tag.y,
        i: tag.i,
        templateId: tag.templateId
      })
      .catch(error => {
        return error;
      });
    return createdTag;
  }
}

export default TagDaoImp;
