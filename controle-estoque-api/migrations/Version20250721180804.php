<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250721180804 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE movimentacoes_entity (id INT AUTO_INCREMENT NOT NULL, produto_sku INT NOT NULL, nome VARCHAR(255) NOT NULL, tipo VARCHAR(10) NOT NULL, quantidade INT NOT NULL, data_hora DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE produtos_entity (sku INT NOT NULL, nome VARCHAR(255) NOT NULL, quantidade INT NOT NULL, preco_compra DOUBLE PRECISION NOT NULL, preco_venda DOUBLE PRECISION NOT NULL, PRIMARY KEY(sku)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE movimentacoes_entity');
        $this->addSql('DROP TABLE produtos_entity');
    }
}
