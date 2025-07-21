<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250721171302 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movimentacoes_entity DROP FOREIGN KEY FK_131CC372E65CF86B');
        $this->addSql('ALTER TABLE movimentacoes_entity ADD CONSTRAINT FK_131CC372E65CF86B FOREIGN KEY (produto_sku) REFERENCES produtos_entity (sku) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE movimentacoes_entity DROP FOREIGN KEY FK_131CC372E65CF86B');
        $this->addSql('ALTER TABLE movimentacoes_entity ADD CONSTRAINT FK_131CC372E65CF86B FOREIGN KEY (produto_sku) REFERENCES produtos_entity (sku) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
