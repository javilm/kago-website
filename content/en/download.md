---
title: "Download"
description: "Download KAGO and UNKAGO, the archivers for MSX-DOS2 that handle ZIP, LZH and PMA."
aliases: ["../../download/"]
---

Everything on this page is free.

## KAGO and UNKAGO {{< version >}} {#kago}

The two programs, ready to copy to the MSX as they are:

- {{< download "kago.com" >}}: the compressor
- {{< download "unkago.com" >}}: the decompressor

The [manual](/en/manual/) is on this site. Its plain-text version for
the MSX, `MANUAL.TXT`, and `README.TXT` are on the
[release page on GitHub](https://github.com/javilm/kago/releases/tag/v{{< version >}}),
which also has the older versions and what changed in each.

## Installing

Copy `KAGO.COM` and `UNKAGO.COM` to any directory in your `PATH`. For
example, with the tools on drive B: and your commands in `A:\UTILS`:

```session
A>COPY B:KAGO.COM A:\UTILS
A>COPY B:UNKAGO.COM A:\UTILS
```

`PATH` alone shows the directories MSX-DOS2 searches. If yours is not
among them, add it with the `PATH` command (`HELP PATH` describes it),
and put that line in `AUTOEXEC.BAT` to keep it. Then check that the
tools run:

```session
A>KAGO /V
A>UNKAGO /V
```

Nothing else is needed: no configuration files, no environment
variables. The [manual](/en/manual/) describes both tools completely.
