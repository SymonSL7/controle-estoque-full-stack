<?php

namespace App\Entity;

use App\Repository\ProdutosEntityRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProdutosEntityRepository::class)]
#[ORM\Table(name: "produtos_entity")]
class ProdutosEntity
{
    #[ORM\Id]
    #[ORM\Column]
    private ?int $sku = null;

    #[ORM\Column(length: 255)]
    private ?string $nome = null;

    #[ORM\Column]
    private ?int $quantidade = null;

    #[ORM\Column]
    private ?float $precoCompra = null;

    #[ORM\Column]
    private ?float $precoVenda = null;

    public function getSku(): ?int
    {
        return $this->sku;
    }

    public function setSku(string $sku): static
    {
        $this->sku = $sku;

        return $this;
    }

    public function getNome(): ?string
    {
        return $this->nome;
    }

    public function setNome(string $nome): static
    {
        $this->nome = $nome;

        return $this;
    }

    public function getQuantidade(): ?int
    {
        return $this->quantidade;
    }

    public function setQuantidade(int $quantidade): static
    {
        $this->quantidade = $quantidade;

        return $this;
    }

    public function getPrecoCompra(): ?float
    {
        return $this->precoCompra;
    }

    public function setPrecoCompra(float $precoCompra): static
    {
        $this->precoCompra = $precoCompra;

        return $this;
    }

    public function getPrecoVenda(): ?float
    {
        return $this->precoVenda;
    }

    public function setPrecoVenda(float $precoVenda): static
    {
        $this->precoVenda = $precoVenda;

        return $this;
    }
}
