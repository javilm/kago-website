---
title: "Kago"
description: "KAGO and UNKAGO create and extract ZIP, LZH and PMA archives on the MSX, under MSX-DOS2 or Nextor. One pair of tools for every format."

hero:
  # One line per part; a long heading may break between them on a phone.
  heading:
    - "One pair of tools for every archive format on the MSX"
  lead: "KAGO packs files and whole directory trees into ZIP, LZH and PMA archives; UNKAGO lists and extracts them, including the ones made on modern computers that MSX tools could not open before. Instead of a different tool for each format, one simple pair of tools does it all."
  note: "Free software under the Apache License 2.0. Written entirely in Z80 assembler."

formats:
  heading:
    - "One tool, "
    - "all three formats"
  intro: "`KAGO` takes the format from the archive's name, or from `/F:`. `UNKAGO` needs no switch at all: it recognises the format by itself, whatever the file is called."
  items:
    - name: "ZIP"
      ext: ".ZIP"
      text: "The format of every modern computer. Archives made by `zip`, Windows, macOS or Linux open on the MSX."
      kago: "deflate, or stored"
      unkago: "deflate and stored"
    - name: "LZH"
      ext: ".LZH .LHA"
      text: "The classic format of the MSX scene, and of `lha` today, with its 32 KB and 64 KB windows."
      kago: "`-lh5-`, or stored"
      unkago: "`-lh0-`, `-lh1-`, `-lh4-`, `-lh5-`, `-lh6-`, `-lh7-`"
    - name: "PMA"
      ext: ".PMA .COM"
      text: "PMarc's format, made on the MSX for the MSX. Self-extracting `.COM` files open without running them."
      kago: "`-pm2-`, or stored; PMEXT extracts them"
      unkago: "`-pm0-`, `-pm1-`, `-pm2-`"

programs:
  heading:
    - "Two programs, "
    - "in and out"
  kago:
    role: "the compressor"
    text: "Packs files, and whole directory trees, into a new archive, or adds them to one that exists."
    usage: "KAGO [switches] archive files..."
  unkago:
    role: "the decompressor"
    text: "Lists an archive, and extracts all of it or only the members you name, here or anywhere else."
    usage: "UNKAGO [switches] archive [members...]"

features:
  heading: "What they can do"
  items:
    - title: "Whole directory trees"
      text: "Name a directory and everything under it goes in, in ZIP and LZH archives. `UNKAGO` creates the directories as it extracts."
    - title: "Archives from modern computers"
      text: "`-lh6-` and `-lh7-` archives from `lha`, and ZIP files from `zip`, Windows, macOS or Linux, which the older MSX tools cannot open."
    - title: "Long filenames"
      text: "Names that do not fit MSX-DOS's 8.3 form are shortened the way Windows shortens them: `longfilename.txt` becomes `LONGFI~1.TXT`. The same archive always gives the same names."
    - title: "Adding to an archive"
      text: "`/A` adds files to an archive that exists, in all three formats. Files with the same path are replaced; the rest are kept byte for byte."
    - title: "Safe extraction"
      text: "`UNKAGO` checks that everything fits on the disk and in memory before it writes anything, checks every file's CRC, and never replaces a file unless you ask with `/O`."
    - title: "Some members only"
      text: "Choose what to list or extract with `*` and `?`, or by naming a directory; extract it into another directory with `/D:`, created if missing."
    - title: "Dates and attributes kept"
      text: "Each file's date and time, and its read-only, hidden and system attributes, go into the archive and come back out."
    - title: "Any amount of memory"
      text: "Both tools use the mapper memory that is free when they run. With less than it needs, `KAGO` packs with a smaller window, or stores, after asking."
    - title: "Fast on the turbo R"
      text: "Both run on any MSX2 or later with MSX-DOS2, and are simply faster in the turbo R's R800 mode."

requirements:
  heading: "What you need"
  items:
    - "An MSX2 or later running MSX-DOS2 or Nextor, or an emulator that runs them."
    - "A memory mapper, which every MSX that runs MSX-DOS2 has. 128 KB is enough."
  more: "The [manual](/en/manual/) describes both tools completely, and the [examples](/en/examples/) show them at work."

names:
  heading: "Where the name comes from"
  text: "A *kago* (籠) is a basket: something woven of bamboo or rattan that you pack things into, and take them out of again. The weave of its strips, over and under, is the mark of this site."
---
