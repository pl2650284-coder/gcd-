# Supabase Storage 设置指南

## 1. 创建 Storage Bucket

1. 进入 Supabase 仪表盘
2. 选择你的项目
3. 点击左侧菜单的 **Storage**
4. 点击 **New bucket**
5. 输入 bucket 名称：`photos`
6. 设置为 **Public bucket**（公开访问）
7. 点击 **Create bucket**

## 2. 设置 Storage 策略 (Policies)

在 Storage → Policies 页面，为 `photos` bucket 添加以下策略：

### 允许认证用户上传文件
- Policy name: `Allow authenticated users to upload`
- Allowed operation: `INSERT`
- Policy definition: `(auth.role() = 'authenticated')`

### 允许所有人读取文件
- Policy name: `Allow public to view`
- Allowed operation: `SELECT`
- Policy definition: `(true)`

### 允许认证用户更新自己的文件
- Policy name: `Allow authenticated users to update`
- Allowed operation: `UPDATE`
- Policy definition: `(auth.role() = 'authenticated')`

### 允许认证用户删除自己的文件
- Policy name: `Allow authenticated users to delete`
- Allowed operation: `DELETE`
- Policy definition: `(auth.role() = 'authenticated')`

或者，你可以使用 SQL Editor 一次性创建这些策略：

```sql
-- 允许认证用户上传
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'photos');

-- 允许公开读取
CREATE POLICY "Allow public view"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'photos');

-- 允许认证用户更新
CREATE POLICY "Allow authenticated updates"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'photos');

-- 允许认证用户删除
CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'photos');
```

## 3. 完成！

现在你可以在应用中上传照片了。上传的照片会保存在 Supabase Storage 的 `photos` bucket 中。
