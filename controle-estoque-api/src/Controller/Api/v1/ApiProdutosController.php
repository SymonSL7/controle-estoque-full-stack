<?php

    namespace App\Controller\Api\v1;

    use App\Entity\ProdutosEntity;
    use App\Entity\MovimentacoesEntity;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\Routing\Annotation\Route;

    #[Route("/api/v1", name: "api_v1_produto_")]
    class ApiProdutosController extends AbstractController
    {

        #[Route("/listar", name: "listar", methods: ["GET"])]
        public function listar(EntityManagerInterface $entityManager): JsonResponse
        {

            $repository = $entityManager->getRepository(ProdutosEntity::class);

            $produtos = $repository->pegarTodos();

            $dados = array_map(function($produto) {
                return [
                    'sku' => $produto->getSku(),
                    'nome' => $produto->getNome(),
                    'quantidade' => $produto->getQuantidade(),
                    'precoCompra' => $produto->getPrecoCompra(),
                    'precoVenda' => $produto->getPrecoVenda(),
                ];
            }, $produtos);

            return new JsonResponse($dados, 200);

        }

        #[Route("/cadastrar", name: "cadastrar", methods: ["POST"])]
        public function cadastrar(EntityManagerInterface $entityManager, Request $request): JsonResponse
        {

            $data = $request->request->all();
            $data = json_decode($request->getContent(), true);

            $produto = new ProdutosEntity();
            $produto->setSku($data['sku']);
            $produto->setNome($data['nome']);
            $produto->setQuantidade(0);
            $produto->setPrecoCompra($data['precoCompra']);
            $produto->setPrecoVenda($data['precoVenda']);

            if(empty($produto->getSku()) || empty($produto->getNome()) || empty($produto->getPrecoCompra()) || empty($produto->getPrecoVenda())){
                return new JsonResponse("Os campo devem ser preenchidos!", 400);
            }

            $sku = $this->obterSku($data['sku'], $entityManager);

            if ($sku) {
                return new JsonResponse("SKU já cadastrado!", 400);
            }

            if($produto->getPrecoCompra() < 0 || $produto->getPrecoVenda() < 0)
            {
                return new JsonResponse("O preço não pode ser negativo", 400);
            }

            if($produto->getPrecoCompra() > $produto->getPrecoVenda())
            {
                return new JsonResponse("O preço de compra não pode ser maior que o de venda", 400);

            }

            $entityManager->persist($produto);
            $entityManager->flush();

            return new JsonResponse("Produto cadastrado com sucesso", 200);

        }

        #[Route("/editar/{sku}", name: "editar", methods: ["PUT"])]
        public function editar(int $sku, Request $request, EntityManagerInterface $entityManager) : JsonResponse
        {

            $produto = $this->obterSku($sku, $entityManager);

            if(empty($produto))
            {

                return new JsonResponse("Produto não encontrado!", 404);

            }

            $data = json_decode($request->getContent(), true);

            if(isset($data['sku']))
            {

                $produto->setSku($data['sku']);

            }

            if(isset($data['nome']))
            {

                $produto->setNome($data['nome']);

            }

            if(isset($data['precoCompra']))
            {

                $produto->setPrecoCompra($data['precoCompra']);

            }

            if(isset($data['precoVenda']))
            {

                $produto->setPrecoVenda($data['precoVenda']);

            }

            $entityManager->flush();

            return new JsonResponse("Produto editado com sucesso", 200);

        }

        #[Route("/entrada/{sku}", name: "entrada", methods: ["PUT"])]
        public function entradaProduto(int $sku, Request $request, EntityManagerInterface $entityManager): JsonResponse
        {

           $produto = $this->obterSku($sku, $entityManager);

           if(empty($produto)){

            return new JsonResponse(['error' => 'Produto não encontrado!'], 404);

           }

           $data = json_decode($request->getContent(), true);

           if (isset($data['quantidade']))
           {

                $produto->setQuantidade($produto->getQuantidade() + $data['quantidade']);

                $movimentacao = new MovimentacoesEntity();
                $movimentacao->setProdutoSku($produto->getSku());
                $movimentacao->setNome($produto->getNome());
                $movimentacao->setTipo('entrada');
                $movimentacao->setQuantidade($data['quantidade']);
                $movimentacao->setDataHora(new \DateTime());

                $entityManager->persist($movimentacao);

           }

           $entityManager->flush();

           return new JsonResponse(['message' => 'Entrada realizada com sucesso'], 200);

        }

        #[Route("/saida/{sku}", name: "saida", methods: ["PUT"])]
        public function saidaProduto(int $sku, Request $request, EntityManagerInterface $entityManager): JsonResponse
        {


            $produto = $this->obterSku($sku, $entityManager);

            if(empty($produto))
            {

                return new JsonResponse(['error' => 'Produto não encontrado!'], 404);

            }

            $data = json_decode($request->getContent(), true);

            if(isset($data['quantidade']))
            {

                $produto->setQuantidade($produto->getQuantidade() - $data['quantidade']);

                $movimentacao = new MovimentacoesEntity();
                $movimentacao->setProdutoSku($produto->getSku());
                $movimentacao->setNome($produto->getNome());
                $movimentacao->setTipo('saida');
                $movimentacao->setQuantidade($data['quantidade']);
                $movimentacao->setDataHora(new \DateTime());

                $entityManager->persist($movimentacao);

            }

            if($produto->getQuantidade() < 0)
            {
                return new JsonResponse(['error' => 'Quantidade não pode ser negativa'], 404);
            }

            $entityManager->flush();

            return new JsonResponse(['message' => 'Saida realizada com sucesso'], 200);

        }

        #[Route("/deletar/{sku}", name: "deletar", methods: ["DELETE"])]
        public function deletar(int $sku, EntityManagerInterface $entityManager): JsonResponse
        {

            $produto = $this->obterSku($sku, $entityManager);

            if(!$produto) {

                return new JsonResponse(['error' => 'Produto não encontrado!'], 404);

            }

            if($produto->getQuantidade() > 0) {

                return new JsonResponse(['error' => 'Só é possível excluir produtos com quantidade igual a zero.'], 400);

            }

            $entityManager->remove($produto);

            $entityManager->flush();

            return new JsonResponse(['message' => 'Produto deletado com sucesso'], 200);

        }

        public function obterSku(int $sku, EntityManagerInterface $entityManager)
        {

            $repository = $entityManager->getRepository(ProdutosEntity::class);
            return $repository->find($sku);

        }


    }
