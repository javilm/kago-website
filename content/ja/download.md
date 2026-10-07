---
title: "ダウンロード"
description: "ZIP、LZH、PMAを扱うMSX-DOS2用のアーカイバー、KAGOとUNKAGOをダウンロードできます。"
---

このページにあるものはすべて無料です。

## KAGO・UNKAGO {{< version >}} {#kago}

2つのプログラムです。そのままMSXにコピーして使えます。

- {{< download "kago.com" >}}：圧縮ツール
- {{< download "unkago.com" >}}：解凍ツール

[マニュアル](/ja/manual/)はこのサイトで読めます。MSX用のテキスト版`MANUAL.TXT`と`README.TXT`は、[GitHubのリリースのページ](https://github.com/javilm/kago/releases/tag/v{{< version >}})にあります。以前のバージョンと、それぞれの変更点もそこにあります。

## インストール

`KAGO.COM`と`UNKAGO.COM`を、`PATH`に含まれるディレクトリのどれかにコピーします。たとえばツールがドライブB:にあり、コマンドを`A:\UTILS`に置いているなら、次のようにします。

```session
A>COPY B:KAGO.COM A:\UTILS
A>COPY B:UNKAGO.COM A:\UTILS
```

`PATH`とだけ入力すると、MSX-DOS2が探すディレクトリが表示されます。使いたいディレクトリがなければ、`PATH`コマンドで追加し（説明は`HELP PATH`で見られます）、その行を`AUTOEXEC.BAT`に書いておきます。最後に、ツールが動くことを確かめます。

```session
A>KAGO /V
A>UNKAGO /V
```

ほかに必要なものはありません。設定ファイルも環境変数もいりません。2つのツールのすべては[マニュアル](/ja/manual/)で説明しています。
