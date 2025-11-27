-- Adicionar coluna owner_name à tabela collection_points
ALTER TABLE collection_points 
ADD COLUMN owner_name TEXT NOT NULL DEFAULT 'Não informado';