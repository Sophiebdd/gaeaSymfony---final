<?php

namespace App\Entity;

use App\Repository\UsersRepository;
use App\Service\UserService;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\MaxDepth;


#[ORM\Entity(repositoryClass: UsersRepository::class)]
#[Groups(['user_details'])]
class Users
{
    
    #[ORM\Id]
    #[ORM\GeneratedValue]

    
    #[ORM\Column]
    private ?int $id = null;

    
    #[ORM\Column(length: 255)]
    private ?string $nom = null;

    
    #[ORM\Column(length: 255)]
    private ?string $prenom = null;

    
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    
    #[ORM\Column(length: 255)]
    private ?string $adresse = null;

    
    #[ORM\Column(length: 255)]
    private ?string $tel = null;

    
    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $birthdate = null;

   

    /**
     * @var Collection<int, Possessions>
     */
    #[Groups(['user_details'])]
    #[ORM\OneToMany(targetEntity: Possessions::class, mappedBy: 'users')]
    private Collection $possession;

    public function __construct()
    {
        $this->possession = new ArrayCollection();
    }



    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): static
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

        return $this;
    }

    public function getTel(): ?string
    {
        return $this->tel;
    }

    public function setTel(string $tel): static
    {
        $this->tel = $tel;

        return $this;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(?\DateTimeInterface $birthdate): static
    {
        $this->birthdate = $birthdate;

        return $this;
    }

   //// pour l'exercice j'ai déplacé la méthode de calcul dans UserService et j'y fait maintenant seulement appel dans l'entité
    public function getAge(): ?int
    {
        $userService = new UserService();
        return $userService->getAge($this->birthdate);
    }




    

    /**
     * @return Collection<int, Possessions>
     */
    public function getPossession(): Collection
    {
        return $this->possession;
    }

    public function addPossession(Possessions $possession): static
    {
        if (!$this->possession->contains($possession)) {
            $this->possession->add($possession);
            $possession->setUsers($this);
        }

        return $this;
    }

    public function removePossession(Possessions $possession): static
    {
        if ($this->possession->removeElement($possession)) {
            // set the owning side to null (unless already changed)
            if ($possession->getUsers() === $this) {
                $possession->setUsers(null);
            }
        }

        return $this;
    }
}
