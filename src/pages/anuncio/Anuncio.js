import React from 'react';

import { View, Text, TouchableOpacity, Image } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { navigationOptions } from "../../styles/StyleBase";
import StyleAnuncio, { 
            anuncioIconeAvaliacao,
            searchBarContainerStyle, 
            searchBarSearchIcon,
            searchBarInputStyle, 
            searchBarInputContainerStyle,
            searchBarleftIconContainerStyle,
            searchBarPlaceholderTextColor,
            iconeFiltro
        } from "../../styles/StyleAnuncio";

export default class Anuncio extends React.PureComponent {
  truncaNome(nome){
    const tamanhoTruncaNome = 20;
    return (nome.length > tamanhoTruncaNome?
                nome.substring(0,tamanhoTruncaNome) + "...":
                nome);
  }

  render() {
    return (
      <View style={StyleAnuncio.anuncioContainer}>
          <View style={StyleAnuncio.anuncioColunaEsquerdaContainer}>
              <TouchableOpacity 
                  //style={styles.productButton} 
                  onPress={() => {
                      //this.props.navigation.navigate("Product", { product: item });
                      this.props.navigation.navigate("Anúncio");
                  }}
              >
                  <Image
                      style={StyleAnuncio.anuncioImagemUsuario}
                      source={{uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEBAQEBAKEBAKDQoNDQoJDRsICQ4WIB0iIiAdHx8kKDQsJCYxJx8fLUctMT01QzBEIys/QD8sNzQtLisBCgoKDg0OFxAQFy0dFx0rLS0rLS0tKy0tKy0tLS0rLS0tLSstLSwtKy0rLS0tLS04Ky0rLSstLSsrLSsrKy0rLf/AABEIAMgAyAMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAGAgMEBQcBAP/EAEUQAAEDAgQDBAYGBwYHAQAAAAEAAgMEEQUSITEGIkETUWFxBzKBkaGxFCNScnPBFSQzQpLR8BY0YoKy4TVDRFNUY4MX/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEBAQACAgICAgMAAAAAAAAAAAECEQMhEjEEMhNBIlGB/9oADAMBAAIRAxEAPwAcCPuGsNDaazhYzgvN9bX2QRRMzSxt+3JG0+9adC4BwGwtbuCzk2w4p+wvX4RM5kl9OyuW2Nw6yHAFp5IOYdLOBWcV0IY8i9xckHYpTGY9Dnlv8l3wL/foPOT/AElavUyBuUkOIBNy0ZrLJeCHWr6f7zvkVsKzzafH+roIOo1B67hAfG+lQPGJnzKPP67gs/8ASHds8Th1hI8NCVDoUsFQ6Nwc02LUSUWJNlaASA/q3YHyQhHKHa/BONcQQQSCNQdikYpqAq2oCrpeLIWXZJnc9uhdFZ49qE8V4qeXl0Ur7XeOysMgHT2omFo3oXA6nzKdCymbE5HXzSzOzXd62X3qwwvimeIZOV7Ra3a8xCq8N0PJo6tuHP2jvufmh7DMSjqGB7DrpmZ+80oj4ekb2haGuBDDd59UqMZqmielD/hsn4tN81jkMlrG+ovbKbFbzxTVRRU7nzRxyRhzAY5m5479EDYvxDhj4HRMpKNkz2MDZYoQ11/NdERQNTEZtBM3QX7Lnd5pvE2AkPzlztBlc3snombhjXOBa50bzu+Pr5hRMSimjdGXtppWteCHEZL+BCewFXnU6jfYhcHh8CnauGxvy3fmOTqEyxoJA0F7ak5QqCS2AuIAa+5FyGjtHK0kbJLTQNDoHCPMLBvYvZ4EndMU9VGxpD4mZgHASxTmF/8AJNQ4m4NYwlr2Q6iOdofFf+io7NDkpCDzNc3bpqF5TJZS+72xtjDsptE7KweQJXlXZCjAo81RELbPDvdqjyV13AeHkUFcN6VMZ+98kYvfeQ+DVWLl4/qW+QtBtrcG9zqhbiCmLHNNtHZsp7wiWc6O+65VHEgLo4XX0bykdRojKDO/xsRuDCfp1Nt+1HyK2ZYzwn/fab8Zi2ZY5r+N9a6gT0kt1gPhKL+5HJQP6R3fsB+M75LN0AUyZea4AG5OgQ1ifEUznkRuLGtLgCzUuXOIq8ueYwSGMsCB1Koyf62W2OH7qTjp3Ove5JNyTvdNk663F7JbbgHbon4KYvuOrgS0bX8lqEdwG2l/gk9ntpbUA9QpVRSujtcWLtg7dM9m4gi7OhLs2yAXFUva4OjcWuaRZzDl1Rxwzx4Ypfr2Z2us0uis1zB1PigACx018dgUmQkHu3v3JXGUttl49xSCrwyR0EkbwJ4GmxyuGvcsypoeZt7HVozA3VXS1TwLX5XO9XorvCHRmRoffKHdNDfops0BLBSDMOaQdpdg5r20Kj4o3sjGcz7XOa5znTqLq2pY2l5uJOXKYzm5Qdbqs4pj/ZGwJbnNjygqDC1bCZSLBtmBwz7vPXUJFPgspc0OaGNcHPa+Z4hY4Drr5q/wpzmRDN9IGd8l+zaIIR5yWJXixjJ22dE7kcS2EfpIxDv10R5a6OK+PAmOIGd8tv8Al0bDIP4tk7XYVExrQIY4jnaC+eo7WY/5Qrx8rSBm7RwIBDaupFKy33GJiqJDYy1jGATQ2dT0xiG/23qPKgO1WHMETnhs2ZuW5DOzpmd413XVeVA53Of2codbMyV5q3N/xEM0XlUzoSsBH6xH94/JFuYZ3dC0BC3D0ZNQyw9XM4+5Ek9wXPAvYNa4bWW2Lkw+p95JBFtwVRYrMHRRi+oIuPgruCW4FxbzQnXC0jxro91u5PJOd6TuGjarpvx4vmtnKxbh8/rVP+PD81tF1jm1+N6rxWeelSQtDXA2McEjgfatDWael02F+n0c/NZuli7ySSTckkkkm5KQUpxXWMuulDoHuVjh0tiAbEAgjo4FO0+DySN5QSegGpKjHDJASHfVlnR3rFT5RpML/R3HXmSW1xoG2aNFV1EJjsD1se9SZ6d4Oodm+2dCVElB6367qpU2OsfsDsL271w67e5MpTT8SNE0vC46eat8LdcsJGocw6+aqydPFOxO1AFwSW3RQ1SmPM32qt4ncOTTU5rKXhUpeyFwvzMF76k6JriWnzdnqBYPvcXKxh30seEGXph+JKrSXDIH6uhhJ7ywZlWcGyt7ERcxcC+S+WwsSiMMWOXtc9KYcN0oOZkboyf3oJHRO+abqeF4ZCHPfVkstlzzdoB71fhiUGpGoZOHgWGP6RWBjxlLGOawW9y8r/IvJgAcPyZZ2f4g5qK4Tdzx05T5qC/hKeJ4fE5koZchp5JU5hsz7uErSx7ct2kZCt8nLx42e3qoFr72JGg5VRYuy0pP2mtKIql2qpMaZqw+BCuZbxZcuJrA/wC80/48PzC2dYzgmlTAe6eH5hbLdZZtPjeqUs29MrPqWu72OZ8QtIWc+mt4FJF3vlLR81E9uliakUY5h5hNZVPoqJ5I5XWNtbLot0WMux5w+WhgsBfS5G6mVmGCUhwDcw6/vKHhEWRgHgFd07vFcVvb0cZ0qxw41/rj80NcQcOFh5RudO5aQw+VvDdR62na4WOoPtsqmVgvHMumM1GFvb0KjikI6LS8QwoA3Go+KgfophIuBotfzML8cJ0eDvkuQLAdVAniMTy06FpWoUdI1osAEEcXQWnBH74CMOTdRy8Uxx2PeHBmhpzbL9WLtO40UDjYlpisSLiS9tO5XOCxObHC12rhG0OO3RUvHY54fuyefRW576XfBDAaVrjqS+UZt3WRCGqi4DH6mPxZvmiQMWN9qno1lSsieDF3Iko0GrifyryCSWr0tOx452td94XKr6nFBE/I5rtQ0h45gp8FSx4u1zT8HLqZKqu4dzaxSZT9mTnHvQxxBhssYBex1mk87eeM+1aIw9e/ruE8ADoQCDuDqE5EZY+UZHhhtNEe6WE/ELZJNj5FUlXwvSykPDOye0tdmg5Gk+I2V246HyKy5D4cLjtS8X4i6npC9hs97mMafNZjjrzWQBjy4OicJBrdt1oPH1MX0jCNopmOf5WKzH6WM+VoJzXaT0WPe3o8UlwDNHRZpgzxsjinow2w05QFSYXGBVSn/t2AGyvX1AAJO/RHJlsceMkWEMIAu4gBSYZY+9p8ig6q7SS95XtB7jYKuLJIz9XM1x+y51ilMNrvJpp8VSw6CxHjukyOBOn+yzSnxyeI2kDvPoiLD8a7TS+o79UXGxWPJKI5IzY+r81Xuojfv+ASP0nYcx2Sf02y18zfIlTqrth17S0bfmEG40zPWU7ehdHfutdFL8dhcQwnV2nehyq5q+M9GGFo96rjlmTm+RlPHof045m/5kNceDnh+7J5omhPO3T7XyQzx2eeLvyO+a6I4r6EPAQ/U2/izfNEoCHeAx+pM8ZJvmiRoWN9rnooJdkkBKskb1l5KAXkwg1NTBmMcuUGzdXtu3XxTbcMZnjkicLAi9nZmkeCkVVAyW+YakCzwbEf1dNQYYYz9W827SJ2U8ug3HxXSxLjbPFcAB7WxNygatuLe1Lp8cboJGPYdL6aJH0iobJYtuzM45rbjz9yeZVwTWEjQCWhw7QfmmS6heCARs4AgrqRTZcrcpBaGjKQcwslArPkXig4rSXpZoxmN43lodzm+6ydmF9i8Tg3Y8P+rPrMK2crN+M8Lkpy5zdYZnEtO+Q9ywrr4ctbgIwyUOnnI6vCuZYMw/q6E8InyTOH2nORfTuuEuSarTju4oayjLtHFwte3QKnlwtzXgm+W4u6PQ2RrVUFxcF19fFVEgcND08LFPDOw8uOVUwSkOLbOLP3e0GqtsOY0EkafJRjDcogwLCMzS51xbYbBO08cO1ViswAsTbY96HZqmNzrF0u/qtFldY5R/WObqQ1wsVXQ4Uc4fobEHK7RPCyI5JbT9HRwSDlMgcP3i7VTqYfrELTqWvjzOO51XIKUh5ebXfqQ3RqVQG9XH+M1PG7rHm6xjSadvM3/MhL0gj62H8J3zRlAOYeTkH+kPSWH8J3zWkc4j4FZaij8XTH4oiAQ9wP/covvTf6iiJqyvtcdASgF4BKUm8FxKAXlWgaaVWVmLujkIaGkBrbMkBjc43IOvuWdUnFmKREB7JJQ21+3pzHJ7wizDuKoZWt7bkkO8bo3EN9tlvtnZV9SY613rNczobfWAHxVoaWOQhxDSRezho5DD8To2AuzN137Nhe74KG/i6kjN2fTC47dnTvAPwR5F40e0cAjaGNvYFxF9U6Cs6i4/u11mSiQA5GPeOycfPce5D441xgTCQiB8et6WMjLbz3v4pZdqnTZrql4qbeA/eb4hDo46HZteW1QeRrTtjD3tPnshvjn0gkwiCAnPKAZHPbkdF4eaz8bVAosy1DvxHbaDdFdE+wB8vJCOHvJ5nXJdfU6lEtLIMoCnkjp4b0uBWAf1oq3EpGuNxoetlErq1sW+52CjUs4kOrgPDYKJi6POelng1IZnEgANZa5d1Rfh0FmP2FhYBAP6QdCS2NwAOt1bU+NvAFzpuT0T0rHKG8Sj+sIO5JTDaYjbr0TmJ1wlAcB+zdfMl08wICkrpxzMoJ7gSoGDC9RCevaM+atGU5ne2Jtx2ujnAZi0dT7lc0HC0cMjZRK9/ZkODQwBvzWvFPbi+Te5BHC7nb5OQX6SJg2eG/WJ2X3qTxBj80MgNOKd4ZcdncGY997kIexqulr8hkgljdEHNzZMzfgStXOPOEZ2Nw2OR5DWMbM5ztxbMUE8VcdTTnJTmSCIaXvllf7VZ9h2lBDRtqDF2L3Ole+F3PqSALeaqHcAF2orqO3i1zXJTGfs6oaXFpwbioqA77XaFFOCekWeECOdona0tHajlmt+arncC2t+v0Ou3I/wDklf2IsQDX4ab95LSqslLtr2E4nFVRNlhcHNduP32HuI6FcQJwjhj8PmzCtw90MgyywiWzndxHivLO4q20E1TTuxp9iS6aM7xsPfygoObx/hx/5zx5xkJ5vHGGn/qWjzaR+SeqroVF8R3ij/huk2p/+zH/AABDbeMcOP8A1UPtuE4OK6A7VVP/ABWSC7kpaR3rQQH70YckHCqA701N7GBqpqniqhY3N9IjcOjY+dxQdjHpCleS2naI26jtHc8p/kqktK0X8V1OGUUJP0eF0r2u7GEcpv3nwWGzzF73OPefJWdZWPlcXSOe9zrkuec7lSjY+N1pJpO90Rw0xbDE/XmZqParClluAO73qXSAGJg6ZGhQKqMxuuBoua3ddUmisVg7TKRoToSo7aYxna405ho4KUJgQ0dQSpA19o9iW7FySq6SAP1DrH/FukvppLAA3ABvzbqTUOaPWaR4t1C9Cxjti4b6bFPavGInbSQix2d36q1wufMy/wAFDqcPBFgXX+043SJJm08YbfU6kdSj7ek7uPv0PeAIw+aaQvhaI4jE3tHAOJdvb2K6qsBgzhwxBkTtQA2VoHuusN7Ukkkm7je+yWfO/tut8cNRx55+V22Ob0fxyHN9LLg6/MGB90wfRez/AMp3tjBWXUGJzwG8Us0f4by1vuRZhHpBqGWE9pm6c37OUe1FlLcEv/5gOlXb/wCdj81wejJw2rfdHr81aYRxHT1WkUpD7X7GTkl/3VqJD3u96k9BoejmYbVjT95hv808PR9UDasb7WEj5oibMftOTjZnfad70bPQZ/sFU9ainNu9rh+a6ihs7vtOXUbGmbu9FdL0qKweYa78ky70UwdKqp9sTSib+1EHXMAOp2Q3j/Hx1ZTDKdQZpBmd7AlLaLqKjG+AKSlbmlr3t0OWPsQ+V3kLoUioWC9jm1OV0gsfcpNRJJM4vkc57nal8jszk06Fw1+Wq2k/tnXJYrJuTT3JYl6H3rkwtl63DnE+CYMNO/3XKG1vKpUhsT1uDqorTpZCsRjglRmib3tACmTsDhY9UOYDU5dEStcCFyZzVdWN3FFiEboiD0v6w1VhhVawizrWGg71KfGHAtcAQeh2Q7iNDJC7NHmLHbZeZwTmr1S7xu4I6uBjhcJuliAtsh2PFnsHMHb9V39JSP0YHE946Jfjq/zRa4rXhmxHchatr3Pfc/7Lta92azt9yoUo2K3wwkc3Jncli2xFwvXI8vioVNPl8uoVi2xAI2K0ZONlXc64+PuTZKAkR1DmkFrnNc0gtew5XAq8dx5iQDS2RjtgWmIOddDV07R1L4pGyRuLXxOa9jh0ISsMQN9IuJ/+v2wWSh6SsRHSDz7Gy1HhnG21tO2UBocOSaMC+V/8lbZG/ZYf8oKz/wAUxoelDER0pvbEvLZOwZ1jh9sYK8j/AAaYZiGIuedDYdw2UBca26fjgLthfwG60k0ggOI1CebLe248brs1GQCbtuN2g3cFXiQdbkjv2TCwneyxNrkA3yjRR3u1O1sjW2STIcpBFtDaybkG/wB4oBh2/gooOqkPUaXQ+aDlTKN9iimgqLgIOhft7ld4dPYgLHkjbG6EV0ljrFdjdcXXVg2MVETH7saddyLpqoyxsNg0aHYWUsqlxifSyrHull0Hah13uJ6lMvHKUu9yU1INT4WXVHLaQ1SqOWxsTo7vUUJTCmlavkLSQdSO46Jh0hO/8k00pSAWVy+q8kA6jyKQXGA47NRyF0TiA8APaeZjvYi9nGlUQCHQm9jfKs4aSr/BnAtynduo8lOXpUFrOM6rvh9y8qcQjuC8svJelLSxBx5jlbe2c7KbLKxujOXS+be5UCWX6vL000UAznr0XSydrJiXEk+tuowd7wlSG6j5tQUgnB92+OgXn9PFzlHB1HiQnn/u+1AIkKj1A1CkSBMTnQIOG4yrKjkv5tVWpEMmUg+V1Nm1yjLDpbhSyqvDXjQg6EBWTnrlvt0Y+jdQ6wQ1jEmhPsCvamVC2LS3cB3alacc7RyXpEg63802DcnxXr6FJjNiuhz0q3RcIsnSElwQTsTuifUZmhCkIBYKQ42cPaugpqoOoPgUGmRsBU6ll7NzXdGkX66KphnUjOXaDrskQ7paOSRofGxz2O9V8fO1eQbBV1EbS1k00TXm5EchjC8svxVfmafJdR3r2ZcctkOXUd/UJ4lMSboB6I3LfMKQ8er5KJTHW3dcqblu4D/C1Ace3RMTN5T4e9THN38FHf6rvJAV2viu5z3rpeuWQpMp6x7LOYbdHDdqsY8eds8e1ipGC1+49F1TcZVS2LyTFGuGh9h0KpJ35nE95PmkWTjtUTGQW2khuiacFIITDlRU+12g/orrgm4jonghBp7U6Fx2y4OnkgHB5/mU3UnQeaUEifb2hAM5l3Oe8pFl0OQD2YnclcSNT8PFeQEm6VdeXkAklNTDquLyA7TyhpNxfMLKbDWsHWx7yLldXkA7DUt72G+9zkKaqIze4Fge5weF5eQFfIyxSQvLyFR268CuryRvOSwF5eQcecmZF5eTFKiToK8vIQ7dc7vJeXkE6Eifb3Li8gI915eXkBx5Nj00O2hXl5eTD//Z'}}
                      //source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
                  />
              </TouchableOpacity>
          </View>
          <View style={StyleAnuncio.anuncioColunaDireitaContainer}>
              <TouchableOpacity 
                  //style={styles.productButton} 
                  onPress={() => {
                      this.props.navigation.navigate("Chat");
                  }}
              >
                  <Text style={StyleAnuncio.anuncioNome}>{this.truncaNome(this.props.nome)} {this.truncaNome("Qdo trazer do banco truncar")}</Text>
                  <View style={StyleAnuncio.anuncioColunaDireitaLinha}>
                      <Ionicons name="ios-star" size={anuncioIconeAvaliacao.size} color={anuncioIconeAvaliacao.color} />
                      <Text style={StyleAnuncio.anuncioAvaliacao}>0,5</Text>
                      <Text style={StyleAnuncio.anuncioSeparador}> - </Text>
                      <Text style={StyleAnuncio.anuncioProfissao}>enfermeiro</Text>
                      <Text style={StyleAnuncio.anuncioSeparador}> - </Text>
                      <Text style={StyleAnuncio.anuncioPreco}>R$ 120*</Text>
                      
                  </View>
                  <Text style={StyleAnuncio.anuncioPrecoObservacao}>* Estimado para o turno de 12 horas</Text>
              </TouchableOpacity>
          </View>
      </View> 
    );
  }
}