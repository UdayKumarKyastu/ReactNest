# LabelPreview component

## Summary

🚨 This component is experimental. It uses values and code provided by the engineers at SATO (the label printer company Pret use). 🚨

It has been configured to match the print preview output for our current label sizes.
The current label size is 44mm x 120mm. Using a conversion scale of 12dpmm (dots per milimeter), the final digital representation (in px, which can be scaled up or down) is 528px x 1440px.

## Fonts

The `pret.ttf` font inside the `customFonts` folder is a specially modified version of `Avenir Next Regular`. This font is used directly on the printer and is a hybrid of normal and bold fonts.

This font is loaded on demand using the web `FontFace` API.

Bold characters start at position `0x4000`. In order to convert normal text surrounded by `<b>` tags into bold text, custom string replacement is used in the `embolden` function.

> NOTE: If modifying this code for any reason, you should use extreme caution due to the brittle nature of the code. If in doubt, always consult SATO with any changes to the label output.

## Configuration and label sizing

All configurable attributes including dimensions are stored inside the [consts file](./lib/consts.ts).

Any values used as coordinates inside the canvas are relative units.

Dimensional values, like label width and height are based on the previously mentioned mm->px conversion scale (1mm = 12px).

> NOTE: If you are asked to change these values due to changes in the label size, ensure you consult with SATO developers on your changes to verify that they are correct as possible.