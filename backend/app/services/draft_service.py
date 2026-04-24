def generate_contestation(analysis: dict):
    pedidos = analysis.get("pedidos", [])
    resumo = analysis.get("resumo", "")

    contestacao = f"""
I - SÍNTESE DA INICIAL

{resumo}

II - DO MÉRITO

"""
    
    for pedido in pedidos:
        contestacao += f"""
Em relação ao pedido de {pedido}, impugna-se por ausência de comprovação.

"""
        
        contestacao += """
III - DOS PEDIDOS

Diante do exposto, requer a improcedência dos pedidos formulados.
"""

    return contestacao