<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250708213919 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE movimentacoes_entity (id INT AUTO_INCREMENT NOT NULL, produto_sku INT NOT NULL, tipo VARCHAR(10) NOT NULL, quantidade INT NOT NULL, data_hora DATETIME NOT NULL, INDEX IDX_131CC372E65CF86B (produto_sku), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE movimentacoes_entity ADD CONSTRAINT FK_131CC372E65CF86B FOREIGN KEY (produto_sku) REFERENCES produtos_entity (sku)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movimentacoes_entity DROP FOREIGN KEY FK_131CC372E65CF86B');
        $this->addSql('DROP TABLE movimentacoes_entity');
    }
}
