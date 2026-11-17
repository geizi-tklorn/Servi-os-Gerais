import os
from flask import Flask, render_template, jsonify

# Importação dos Blueprints (rotas modulares definidas na árvore de diretórios)
# Caso ainda não tenha criado os arquivos em routes/, comente estas linhas temporariamente
from routes.main_routes import main_bp
from routes.auth_routes import auth_bp
from routes.clientes_routes import clientes_bp
from routes.servicos_routes import servicos_bp
from routes.produtos_routes import produtos_bp

def create_app():
    """Factory function para inicializar e configurar a aplicação Flask."""
    app = Flask(
        __name__,
        template_folder='templates',
        static_folder='static'
    )

    # Carrega configurações do arquivo config.py ou variáveis de ambiente
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'chave-secreta-desenvolvimento-123')
    app.config['JSON_AS_ASCII'] = False  # Garante suporte a acentuação em respostas JSON (PT-BR)

    # Registro dos módulos de rotas (Blueprints)
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(clientes_bp, url_prefix='/clientes')
    app.register_blueprint(servicos_bp, url_prefix='/servicos')
    app.register_blueprint(produtos_bp, url_prefix='/produtos')

    # Tratamento global de erros
    @app.errorhandler(404)
    def pagina_nao_encontrada(error):
        return render_template('index.html', erro="Página não encontrada (404)"), 404

    @app.errorhandler(500)
    def erro_interno(error):
        return jsonify({"erro": "Erro interno no servidor. Tente novamente mais tarde."}), 500

    return app

# Instância principal da aplicação
app = create_app()

if __name__ == '__main__':
    # host='0.0.0.0' permite que o app seja acessado de qualquer dispositivo na rede local/externa
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
