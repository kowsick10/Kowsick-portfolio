import { Canvas } from '@react-three/fiber'
import { Float, RoundedBox, Text } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'
import { skills } from '../data'

const columns = 7
const keyWidth = 0.92
const keyDepth = 0.68
const gapX = 1.02
const gapZ = 0.8
const keyColors = ['#5b8cff', '#58e6d9', '#a78bfa', '#5b8cff']

const skillKeys = skills.flatMap((group) =>
  group.items.map((name) => ({ name, group: group.group })),
)

function Keycap({ skill, index, selectedSkill, onSelect }) {
  const row = Math.floor(index / columns)
  const column = index % columns
  const x = (column - (columns - 1) / 2) * gapX
  const z = (row - 2) * gapZ
  const selected = selectedSkill === skill.name
  const color = keyColors[index % keyColors.length]

  return (
    <group
      position={[x, 0.12, z]}
      onPointerOver={(event) => {
        event.stopPropagation()
        onSelect(skill.name)
      }}
      onClick={(event) => {
        event.stopPropagation()
        onSelect(skill.name)
      }}
    >
      <RoundedBox args={[keyWidth, 0.3, keyDepth]} radius={0.09} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial
          color={selected ? color : '#121a2c'}
          emissive={color}
          emissiveIntensity={selected ? 0.24 : 0.02}
          metalness={0.2}
          roughness={0.5}
        />
      </RoundedBox>
      <Text
        position={[0, 0.155, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={skill.name.length > 11 ? 0.095 : 0.12}
        maxWidth={keyWidth - 0.08}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        color={selected ? '#0b1020' : '#aab6cc'}
        outlineWidth={0}
      >
        {skill.name}
      </Text>
    </group>
  )
}

function KeyboardScene({ selectedSkill, onSelect, reduceMotion }) {
  return (
    <>
      <ambientLight intensity={1.3} />
      <directionalLight position={[2, 8, 5]} intensity={1.6} color="#dbeafe" castShadow />
      <pointLight position={[-4, 3, -2]} intensity={3.5} color="#5b8cff" />
      <pointLight position={[4, 2, 2]} intensity={1.2} color="#a78bfa" />

      <Float
        speed={reduceMotion ? 0 : 1.1}
        rotationIntensity={reduceMotion ? 0 : 0.025}
        floatIntensity={reduceMotion ? 0 : 0.13}
      >
        <group rotation={[-0.16, 0, -0.06]}>
          <RoundedBox
            args={[7.45, 0.34, 4.35]}
            radius={0.22}
            smoothness={6}
            position={[0, -0.12, 0]}
            receiveShadow
          >
            <meshStandardMaterial color="#121a2c" metalness={0.24} roughness={0.5} />
          </RoundedBox>
          {skillKeys.map((skill, index) => (
            <Keycap
              key={skill.name}
              skill={skill}
              index={index}
              selectedSkill={selectedSkill}
              onSelect={onSelect}
            />
          ))}
        </group>
      </Float>
    </>
  )
}

export default function SkillKeyboard({ selectedSkill, onSelect }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="skill-keyboard" aria-label="Interactive 3D keyboard showing portfolio skills">
      <Canvas
        camera={{ position: [0, 6.8, 7.8], fov: 38 }}
        dpr={[1, 1.5]}
        shadows
        gl={{ alpha: true, antialias: true }}
        fallback={<p className="px-6 py-12 text-center text-sm text-muted">Use the skill list below to explore my skills.</p>}
      >
        <KeyboardScene selectedSkill={selectedSkill} onSelect={onSelect} reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  )
}
