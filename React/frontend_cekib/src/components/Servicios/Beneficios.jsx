import {
    List,
    ListItem,
    Card,
    Typography,
} from "@material-tailwind/react";

// Datos de los beneficios
const BeneficiosData = [
    { 
        title: "Optimiza la movilidad",
        description: "Reduce el dolor en articulaciones, músculos y huesos, promoviendo la recuperación completa de lesiones traumáticas y deportivas.",
    },
    { 
        title: "Mejora la respiración",
        description: "Aumenta la capacidad pulmonar y ayuda en el manejo de afecciones respiratorias, facilitando una respiración eficiente y saludable.",
    },
    { 
        title: "Rehabilitación Neurológica",
        description: "Mejora la calidad de vida y la independencia en personas con condiciones neurológicas, trabajando en la movilidad y coordinación.",
    },
    { 
        title: "Mejora el descanso",
        description: "Reduce tensiones musculares y corrige desequilibrios físicos que afectan la calidad del sueño.",
    },
    { 
        title: "Nutrición Integral",
        description: "Ofrece planes de alimentación personalizados para mejorar el bienestar general y la energía diaria.",
    },
    { 
        title: "Alivio de dolores",
        description: "Técnicas manuales para aliviar dolores crónicos y agudos, favoreciendo la recuperación.",
    },
    { 
        title: "Recuperación Post-parto",
        description: "Fortalecimiento del piso pélvico y mejora de la estabilidad después del embarazo.",
    },
    { 
        title: "Entrenamiento Deportivo",
        description: "Programas personalizados para mejorar la fuerza, resistencia y flexibilidad en el deporte.",
    },
    { 
        title: "Terapia Ocupacional",
        description: "Recupera la independencia en actividades cotidianas y mejora la calidad de vida.",
    },
];

export function Beneficios() {
    return (
        <div className="bg-deep-purple-200 p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BeneficiosData.map((beneficio, index) => (
                    <Card
                        key={index}
                        className="bg-white p-1 rounded-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
                    >
                        <List>
                            <ListItem>
                                <div>
                                    <Typography variant="large" color="blue-gray" className="text-center text-teal-500">
                                        {beneficio.title}
                                    </Typography>
                                    <Typography variant="small" color="gray" className="font-normal text-center">
                                        {beneficio.description}
                                    </Typography>
                                </div>
                            </ListItem>
                        </List>
                    </Card>
                ))}
            </div>
        </div>
    );
}
