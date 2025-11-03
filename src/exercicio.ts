interface MudancaDeEstado {
    mudarEstado(estado: string): void;
}

class FicarOnline implements MudancaDeEstado {
    mudarEstado(estado: string): void {
        if (estado === "Offline") {
            estado = "Online";
            console.log("Jogador agora está online.");
        } else {
            console.log(
                "Falha: não pode ficar online se já estiver online, em jogo, pausado ou desconectado."
            );
        }
    }
}

class IniciarJogo implements MudancaDeEstado {
    mudarEstado(estado: string): void {
        if (estado === "Online" || estado === "Pausado") {
            estado = "Em Jogo";
            console.log("Jogador agora está em jogo.");
        } else {
            console.log(
                "Falha: não pode iniciar jogo se estiver offline, em jogo ou desconectado."
            );
        }
    }
}

class Pausar implements MudancaDeEstado {
    mudarEstado(estado: string): void {
        if (estado === "Em Jogo") {
            estado = "Pausado";
            console.log("Jogador agora está pausado.");
        } else {
            console.log(
                "Falha: não pode pausar se estiver online, offline, pausado ou desconectado."
            );
        }
    }
}

class Desconectar implements MudancaDeEstado {
    mudarEstado(estado: string): void {
        if (estado === "Em Jogo" || estado === "Pausado") {
            estado = "Desconectado";
            console.log("Jogador agora está desconectado.");
        } else {
            console.log(
                "Falha: não pode desconectar se estiver online, offline ou desconectado."
            );
        }
    }
}

class FicarOffline implements MudancaDeEstado {
    mudarEstado(estado: string): void {
        if (estado === "Online" || estado === "Desconectado") {
            estado = "Offline";
            console.log("Jogador agora está offline.");
        } else {
            console.log(
                "Falha: não pode desconectar se já estiver offline, em jogo ou pausado."
            );
        }
    }
}

class MudancaDeEstadoException extends Error {}

class EstadoFinal {
    static criar(estadoFinal: string): MudancaDeEstado {
        switch(estadoFinal) {
            case 'online':
                return new FicarOnline();
            case 'em jogo':
                return new IniciarJogo();
            case 'pausado':
                return new Pausar();
            case 'desconectado':
                return new Desconectar();
            case 'offline':
                return new FicarOffline();
            default:
                throw new MudancaDeEstadoException('Estado informado inválido.');
        }
    }
}

class Jogador {
    public mudarEstado(estado: string, estadoFinal: string) {
        try {
            const mudancaDeEstado: MudancaDeEstado = EstadoFinal.criar(estadoFinal);
            return mudancaDeEstado.mudarEstado(estado);
        } catch (error) {
            //
            return false;
        }
    }
}