// Posição inicial do mapa (coordenadas LatLong e Zoom)
const posicaoInicial = [-30.47713, -53.6475, 7]

// Inicializa o mapa
const map = new L.map('map', {
    center: new L.LatLng(posicaoInicial[0], posicaoInicial[1]), 
    zoom: posicaoInicial[2],
    defaultExtentControl: true          
})      

// Tile Layers
const esriTopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri'
})
const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri'
})
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
map.addLayer(esriTopo)

// Estilos
const defaultStroke = '#4d4d4d'
const defaultStrokeLight = '#999999'
const highlightStyle = {	
    color: 'deepskyblue',
    fillColor: 'transparent',
    weight: 2,
    opacity: 1,    
}
function getColor(id) {
    return id == 'Mata Atlântica' ? '#009933' :
        id == 'Pampa' ? '#ffeda0' : 
        'black'
}

// Carregar camadas GeoJSON via leaflet-ajax
const estado = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/rdgomt/tcc-data/master/base_cart/geojson/simplified/divisa_estadual.json", {
    titulo: 'Estado',
    onEachFeature: onEachFeature,
    style: function (feature) {
        return {
            weight: 1.5,
            color: defaultStroke,
            fillColor: 'transparent',
        }
    }
}).addTo(map)
const biomas = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/rdgomt/tcc-data/master/base_cart/geojson/simplified/biomas.json", {
    titulo: 'Biomas',
    onEachFeature: onEachFeature,
    style: function (feature) {
        return {        
            weight: 1,
            color: "transparent",
            fillColor: getColor(feature.properties.nome),
            fillOpacity: .5
        }
    },
})
const mun = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/rdgomt/tcc-data/master/base_cart/geojson/simplified/municipios.json", {
    titulo: 'Municípios',
    onEachFeature: onEachFeature,
    style: function (feature) {
        return {
            weight: 1,
            color: defaultStrokeLight,
            fillColor: 'transparent',
            opacity: 1,
        }
    }
})
const bacias = new L.GeoJSON.AJAX("https://raw.githubusercontent.com/rdgomt/tcc-data/master/base_cart/geojson/simplified/bacias_hidrograficas.json", {
    titulo: 'Bacias Hidrográficas',
    onEachFeature: onEachFeature,
    style: function (feature) {
        return {
            weight: 1,
            color: 'blue',
            fillColor: 'transparent',
            opacity: 1,
        }
    }
})

// Map events
map.on({
    click: () => dehighlight(),            
    popupclose: () => dehighlight(),
})

// Função disparada para cada feição no mapa
let featureHighlighted = null
let zoomReference = null        
function onEachFeature (feature, layer) {
    layer.on({
        click: function(e) {
            zoomReference = e.target                    
            // Alterar estilo ao selecionar feições (highlight e dehighlight)
            if(featureHighlighted === null) {
                featureHighlighted = L.geoJSON(this.feature, {
                    style: highlightStyle
                }).addTo(map)
            } else {
                map.removeLayer(featureHighlighted);
                featureHighlighted = L.geoJSON(this.feature, {
                    style: highlightStyle
                }).addTo(map)
            }
        }
    })
    // Conteúdo da popUp ao selecionar feições
    let popupContent = `<h3>${layer.options.titulo}</h3><table>`
    let i
    for (i in feature.properties) {		
        popupContent += `<tr><th>${i}</th><td>${feature.properties[i]}</td></tr>`
    }            
    popupContent += `</table></br><a href="#" onClick="zoomToFeature(zoomReference)">Zoom para</a>`
    layer.bindPopup(popupContent)
}

// Dehighlight feição ao clicar no mapa (qualquer posição fora das camadas ativas)
// ou ao clicar no botão close de uma popup ativa
function dehighlight() {
    if (featureHighlighted !== null && featureHighlighted !== undefined) {
        map.removeLayer(featureHighlighted)
        featureHighlighted = null			
    }
}

// Voltar o mapa para posição inicial
/* function defaultZoom() {
    map.setView(L.latLng(posicaoInicial), posicaoInicial[2])
} */

// Centralizar a feição selecionada
function zoomToFeature(f) {
    map.fitBounds(f.getBounds())
}

// Escala do mapa
L.control.scale({imperial: false, position: 'bottomleft',}).addTo(map)

// Controle de camadas
const baseMaps = {	
    "Esri Topográfico": esriTopo,
    "Esri Satélite": esriSat,
    "OpenStreetMap": osm
};
const overlayMaps = {
    "Estado": estado,
    "Biomas": biomas,
    "Municípios": mun,
    "Bacias Hidrográficas": bacias
};
L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map)