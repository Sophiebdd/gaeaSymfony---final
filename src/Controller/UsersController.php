<?php

namespace App\Controller;

use App\Entity\Possessions;
use App\Repository\UsersRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Entity\Users;
use App\Form\PossessionsType;
use App\Form\UsersType;
use App\Repository\PossessionsRepository;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;


class UsersController extends AbstractController
{
    #[Route('/index', name: 'users.index')]
public function index(UsersRepository $repository, SerializerInterface $serializer): Response
{
    $users = $repository->findAll();
        //je n'arrive pas à intégrer l'âge sans faire appel à un tableau associatif
    foreach ($users as $user) {
        $usersData[] = [
            'id' => $user->getId(),
            'nom' => $user->getNom(),
            'prenom' => $user->getPrenom(),
            'email' => $user->getEmail(),
            'adresse' => $user->getAdresse(),
            'tel' => $user->getTel(),
            'birthdate' => $user->getBirthdate(),
            'age' => $user->getAge(),
        ];
    }
        //serialisation. Dans l'entité affecter toute la class users dans groups et dans la class possessions seulement les propriétés possessions
    $json = $serializer->serialize(
        $usersData,
        'json', ['groups' => ['user_details']]
    );
    return $this->render('users/index.html.twig', [
        'users' => $json
    ]);
}






#[Route('/index/{id}', name: 'user.show', methods: ['GET'], requirements: ['id' => '\d+'])]
public function show(int $id, UsersRepository $repository, SerializerInterface $serializer): Response
{
    $user = $repository->find($id);
    $userData = [
        'id' => $user->getId(),
        'nom' => $user->getNom(),
        'prenom' => $user->getPrenom(),
        'email' => $user->getEmail(),
        'adresse' => $user->getAdresse(),
        'tel' => $user->getTel(),
        'birthdate' => $user->getBirthdate()->format('Y-m-d'),
        'possession' =>$user->getPossession()
    ];
    $json = $serializer->serialize($userData, 'json', ['groups' => ['user_details']]);

    return $this->render('users/show.html.twig', [
        'user' => $user, 
        'json_user' => $json
    ]);
}



#[Route('/api/users', name: 'add_user', methods: ['POST'])]
public function addUser(Request $request, SerializerInterface $serializer, EntityManagerInterface $entityManager): JsonResponse
{
    $data = $request->getContent();
    $user = $serializer->deserialize($data, Users::class, 'json');

    $entityManager->persist($user);
    $entityManager->flush();

    return $this->json($user, Response::HTTP_CREATED);
}






    #[Route('/index/users/{id}', name: 'users.delete', methods: ['DELETE'])]
    public function deleteUser(Users $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();
    
        $response = [
            'message' => 'L\'utilisateur a bien été supprimé'
        ];
    
        return new JsonResponse($response);
    }

   





    





    


}


