<?php

namespace App\Entity;

use App\Repository\MovimentacoesEntityRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MovimentacoesEntityRepository::class)]
class MovimentacoesEntity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: ProdutosEntity::class)]
    #[ORM\JoinColumn(name: "produto_sku", referencedColumnName: "sku", nullable: false)]
    private ?ProdutosEntity $produto = null;

    #[ORM\Column(length: 255)]
    private ?string $nome = null;

    #[ORM\Column(length: 10)]
    private ?string $tipo = null;

    #[ORM\Column]
    private ?int $quantidade = null;

    #[ORM\Column(type: 'datetime')]
    private ?\DateTimeInterface $dataHora = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduto(): ?ProdutosEntity
    {
        return $this->produto;
    }

    public function setProduto(ProdutosEntity $produto): static
    {
        $this->produto = $produto;
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

    public function getTipo(): ?string
    {
        return $this->tipo;
    }

    public function setTipo(string $tipo): static
    {
        $this->tipo = $tipo;
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

    public function getDataHora(): ?\DateTimeInterface
    {
        return $this->dataHora;
    }

    public function setDataHora(\DateTimeInterface $dataHora): static
    {
        $this->dataHora = $dataHora;
        return $this;
    }
}
