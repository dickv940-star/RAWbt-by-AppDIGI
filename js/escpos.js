/*
====================================================
 RAWbt AppDIGI
 escpos.js v2.0
 ESC/POS Command Library
====================================================
*/

"use strict";

/* ---------- Printer Init ---------- */

function initESC() {

    return new Uint8Array([
        0x1B, 0x40,       // Initialize
        0x1B, 0x61, 0x01  // Align Center
    ]);

}

/* ---------- Alignment ---------- */

function alignLeft() {

    return new Uint8Array([
        0x1B, 0x61, 0x00
    ]);

}

function alignCenter() {

    return new Uint8Array([
        0x1B, 0x61, 0x01
    ]);

}

function alignRight() {

    return new Uint8Array([
        0x1B, 0x61, 0x02
    ]);

}

/* ---------- Feed ---------- */

function feed(lines = 3) {

    return new Uint8Array([
        0x1B,
        0x64,
        lines
    ]);

}

/* ---------- Cut ---------- */

function cutPaper() {

    return new Uint8Array([
        0x1D,
        0x56,
        0x00
    ]);

}

/* ---------- Text ---------- */

function printText(text = "") {

    const encoder = new TextEncoder();

    return encoder.encode(text + "\n");

}

/* ---------- Bold ---------- */

function bold(on = true) {

    return new Uint8Array([
        0x1B,
        0x45,
        on ? 1 : 0
    ]);

}

/* ---------- Underline ---------- */

function underline(on = true) {

    return new Uint8Array([
        0x1B,
        0x2D,
        on ? 1 : 0
    ]);

}

/* ---------- Double Size ---------- */

function textDouble(on = true) {

    return new Uint8Array([
        0x1D,
        0x21,
        on ? 0x11 : 0x00
    ]);

}

/* ---------- Normal Size ---------- */

function textNormal() {

    return new Uint8Array([
        0x1D,
        0x21,
        0x00
    ]);

}

/* ---------- Print Bitmap ---------- */

function bitmapHeader(widthBytes, height) {

    return new Uint8Array([
        0x1D,
        0x76,
        0x30,
        0x00,

        widthBytes & 0xFF,
        (widthBytes >> 8) & 0xFF,

        height & 0xFF,
        (height >> 8) & 0xFF
    ]);

}

/* ---------- Merge Uint8Array ---------- */

function mergeESC() {

    let total = 0;

    for (const item of arguments) {

        total += item.length;

    }

    const result = new Uint8Array(total);

    let offset = 0;

    for (const item of arguments) {

        result.set(item, offset);

        offset += item.length;

    }

    return result;

}
