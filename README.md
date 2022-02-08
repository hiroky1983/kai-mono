# 買い物をもっと効率的に
## 実装詳細

ここにURLをはる

### 実装コンセプト　
----
家族の買い物を効率的にをコンセプトに、ペアリングしたユーザーと買い物リストを共有して買い忘れや買ったものの重複を防ぐことができるアプリです。

<br/>

### 使用技術
----
- フロントエンド 
    - React、Next.js
    - tailwind css
    - supabase ui
    - TypeScript

- バックエンド
    - supabase

- 状態管理
    - SWR

- 認証
    - supabase Auth（Google Provider認証、テストログイン認証）

- PWA対応
    - next-pwa


- デプロイ
    - Vercel

<br/>

### デザイン
----
<p>テーマカラー：#65D8A5</P>
<p>ロゴ: <a src="https://www.canva.com/ja_jp/">　Canva</a></p>

<br/>

### プロダクトの拘った点
----
- PWA対応でスマホで使用する前提でプロダクト作成
- ユーザーのペアリング機能を実装し、共有したいペアユーザー同士での共有が可能
- supabaseのキャッチアップを進めながらの実装
- 
<br/>

### 今後の実装予定
----
- リストの項目に対して写真で確認できるようにする。
- ユーザー検索をもっと簡単に
- supabaseのキャッチアップを深めつつ、functions機能が充実してきたらfetchをバックエンドに完全移行する
- ユーザー名の変更機能を実装
- postgessqlの記法を覚え,supabaseのRow Level Securityでよりしっかりしたセキュリティを実装

