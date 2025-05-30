<script setup>
import { onMounted, ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const irParaHome = () => {
  router.push('/');
};

const carrinho = ref([]);

onMounted(() => {
  const carrinhoSalvo = sessionStorage.getItem('carrinho');
  if (carrinhoSalvo) {
    carrinho.value = JSON.parse(carrinhoSalvo);
  }
});

watch(carrinho, (novoCarrinho) => {
  sessionStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
}, { deep: true });

const aumentarQuantidade = (item) => {
  item.quantidade++;
};

const diminuirQuantidade = (item) => {
  if (item.quantidade > 1) {
    item.quantidade--;
  } else {
    carrinho.value = carrinho.value.filter(i => i !== item);
  }
};

const totalItens = computed(() => {
  return carrinho.value.reduce((total, item) => total + item.quantidade, 0);
});

const totalCompra = computed(() => {
  return carrinho.value.reduce((total, item) => total + (item.valor * item.quantidade), 0);
});
</script>

<template>
  <header>
    <h3><a href="#" @click.prevent="irParaHome">IFgames</a></h3>
    <p>apreço a <br> cultura</p>
    <input type="text" id="searchInput" placeholder="Pesquisar">
    <button onclick="pesquisar()"><img src="/public/Images/icons/procurar.png" alt=""></button>
    <ul>
      <li><a href="#">Termos</a></li>
      <li><a href="#">Equipe</a></li>
      <li><a href="#">Envio</a></li>
      <span>
        <li><a href="#">Devoluções</a></li>
      </span>
    </ul>
    <span class="carrinho-icon">
      <a @click="redirecionarParaOutraPagina" href="#">
        <img src="/public/Images/icons/carrinho-de-compras.png" alt="">
        <span v-if="carrinho.length > 0" class="contador">{{ totalItens }}</span>
      </a>
    </span>
    <span><a href="#"><img src="/public/Images/icons/coracao.png" alt=""></a></span>
    <a href="#"><img src="/public/Images/icons/do-utilizador.png" alt=""></a>
  </header>
  
  <div v-if="carrinho.length > 0" class="compras">
    <h2 id="carrinho">Carrinho</h2>
    <div class="carrinho-cabecalho">
      <h2>Título</h2>
      <h2>Quantidade</h2>
      <h2>Subtotal</h2>
    </div>

    <transition-group name="fade" tag="div">
      <article v-for="item in carrinho" :key="item.id" class="item-carrinho">
        <img :src="item.imagem" alt="Capa do livro" width="70" />
        <div class="info">
          <div class="emparelhado">
            <div class="titulo">
              <h3>{{ item.titulo }}</h3>
              <p>Preço: R${{ item.valor && !isNaN(item.valor) ? item.valor.toFixed(2) : '0' }}</p>
            </div>

            <div class="controles-quantidade">
              <button @click="diminuirQuantidade(item)">-</button>
              <span>{{ item.quantidade }}</span>
              <button @click="aumentarQuantidade(item)">+</button>
            </div>
            <div class="info-subtotal">
              <p>R${{ (item.valor * item.quantidade && !isNaN(item.valor * item.quantidade)) ? (item.valor * item.quantidade).toFixed(2) : '0' }}</p>
            </div>
          </div>
        </div>
      </article>
    </transition-group>

    <div class="resumo-compra">
      <p>Total de itens: {{ totalItens }}</p>
      <p class="total-compra">Total da compra: R${{ totalCompra.toFixed(2) }}</p>
      <button class="finalizar-compra">Finalizar Compra</button>
    </div>
  </div>

  <div v-else class="nada">
    <p>Seu carrinho está vazio.</p>
  </div>

  <footer>
    <div class="divisao1">
      <p class="principal">IFgames</p>
      <a href="https://www.facebook.com/?locale=pt_BR"><img src="/public/Images/icons/facebook.png" alt="facebook"></a>
      <a href="https://www.instagram.com/"><img src="/public/Images/icons/instagram.png" alt="instagram"></a>
      <a href="https://x.com/?lang=pt"><img src="/public/Images/icons/twitter.png" alt="twitter"></a>
    </div>
    <div class="divisao2">
      <p class="principal">Contato</p>
      <ul>
        <li><img src="/public/Images/icons/Phone.png" alt="Telefone">
          <p>+55 47 40045263</p>
        </li>
        <li><img src="/public/Images/icons/Clock.png" alt="Relógio">
          <p>8h às 23h - Seg a Sex</p>
        </li>
        <li><img src="/public/Images/icons/Mail.png" alt="Email">
          <p>contato@ifgames.com</p>
        </li>
      </ul>

      <div class="cartoes">
        <img src="/public/Images/paipalCard-Logo.png" alt="PayPal">
        <img src="/public/Images/MasterCard-Logo.png" alt="MasterCard">
        <img src="/public/Images/VISA-card-logo.png" alt="Visa">
      </div>
      <p class="transp">&copy; Alguns direitos reservados. IFgames 2025.</p>
    </div>
  </footer>
</template>

<style scoped>
/** Inicio Carrinho */

div.nada {
  text-align: center;
  padding-top: 100px;
  font-size: 5rem;
  padding: 20vw;
}

.carrinho-cabecalho {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid #1a1a2e;
  font-weight: bold;
  align-items: center;
}

.carrinho-cabecalho h2:last-child{
text-align: right;
}

.carrinho-cabecalho h2:first-child {
text-align: left;
}

.carrinho-cabecalho h2:nth-child(2) {
  text-align: center;
  white-space: nowrap;
}

.item-carrinho {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  gap: 20px;
}

.emparelhado {  
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
}

.titulo {
  min-width: 580px;
}

.item-carrinho img {
  width: 115px;
  height: auto;
  border-radius: 4px;
}   

.controles-quantidade {
  display: flex;
  align-items: center;
  align-self: left;
  gap: calc(1vw + 2px);
}

.controles-quantidade button {
  width: 30px;
  height: 30px;
  font-size: 16px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controles-quantidade span {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
}

.info-subtotal {
  text-align: right;
  padding: 55px 50px 0 450px;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
  font-size: 1.5rem;
}

.quantidade {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.compras {
  max-width: 1600px;
  margin: auto;
  padding: 20px;
}

h2#carrinho {
  color: #1a1a2e;
  font-weight: 600;
  font-size: 1.8rem;
}

.resumo-compra {
  margin-top: 30px;
  text-align: right;
  padding: 20px;
  border-top: 2px solid #1a1a2e;
}

.total-compra {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 10px 0;
}

.finalizar-compra {
  background-color: #1a1a2e;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.finalizar-compra:hover {
  background-color: #0f3460;
}


/** Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* contador carrinho */
.carrinho-icon {
  position: relative;
}

.contador {
  position: absolute;
  top: 15px;
  right: 5px;
  background: #a51930;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
</style>