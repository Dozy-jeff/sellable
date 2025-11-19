"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, Target, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Prepare",
    description:
      "Get your business ready with guided assessments and AI-powered recommendations.",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Optimize",
    description:
      "Improve your sellability score with targeted tasks and peer mentorship.",
    icon: Target,
    color: "text-blue-600",
  },
  {
    title: "Sell",
    description:
      "Access qualified buyers and close your deal with confidence.",
    icon: TrendingUp,
    color: "text-purple-600",
  },
];

export default function Steps() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  // On-scroll reveal
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="relative py-20 px-4">
      <div className="container mx-auto">
        <div className="relative flex justify-center">
          {/* Graph background */}
          <svg
            version="1.1"
            id="Features-SVG"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 2005.4 777"
            xmlSpace="preserve"
            className="w-full max-w-6xl h-[300px] md:h-[360px] lg:h-[400px] pointer-events-none"
          >
            <defs>
              <radialGradient
                id="Features-innerGradient"
                cx="430.5514"
                cy="426.0181"
                r="315.285"
                gradientTransform="matrix(2.8565 -0.5119 1.0216 1.739 -364.7661 -340.7328)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" style={{ stopColor: "#0072FF", stopOpacity: 0.2 }} />
                <stop offset="1" style={{ stopColor: "#0072FF", stopOpacity: 0 }} />
              </radialGradient>

              <radialGradient
                id="Features-bottomGradient"
                cx="279.3484"
                cy="483.3498"
                r="459.4102"
                gradientTransform="matrix(2.8947 -0.4418 0.494 0.9873 -202.5029 -91.6635)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" style={{ stopColor: "#0072FF" }} />
                <stop offset="1" style={{ stopColor: "#0072FF", stopOpacity: 0 }} />
              </radialGradient>

              <linearGradient
                id="Features-rightGradient"
                gradientUnits="userSpaceOnUse"
                x1="1640.8595"
                y1="373.64"
                x2="2001.5594"
                y2="373.64"
                gradientTransform="matrix(1 0 0 -1 0 763.7801)"
              >
                <stop offset="0" style={{ stopColor: "#FFFFFF", stopOpacity: 0 }} />
                <stop offset="1" style={{ stopColor: "#FFFFFF" }} />
              </linearGradient>

              <linearGradient
                id="Features-leftGradient"
                gradientUnits="userSpaceOnUse"
                x1="1.3595"
                y1="373.64"
                x2="362.0595"
                y2="373.64"
                gradientTransform="matrix(1 0 0 -1 0 763.7801)"
              >
                <stop offset="0" style={{ stopColor: "#FFFFFF" }} />
                <stop offset="1" style={{ stopColor: "#FFFFFF", stopOpacity: 0 }} />
              </linearGradient>
            </defs>

            <style>
              {`
              .Features-gradientGroup1 { opacity: 0.6; }
              .Features-gradientGroup2 { opacity: 0.2; }
              .Features-bottomGradientShape { fill: url(#Features-bottomGradient); }
              .Features-innerGradientShape { fill: url(#Features-innerGradient); }
              .Features-dottedWaveShape {
                fill: none;
                stroke: #C8E2FF;
                stroke-width: 1.5;
                stroke-linecap: round;
                stroke-miterlimit: 10;
                stroke-dasharray: 0,5;
              }
              .Features-blueStroke {
                fill: none;
                stroke: #0072FF;
                stroke-linecap: round;
                stroke-miterlimit: 10;
              }
              .Features-whiteWaveLine {
                fill: none;
                stroke: #FFFFFF;
                stroke-width: 16;
                stroke-miterlimit: 10;
              }
              .Features-dot {
                fill: #0072FF;
              }
              .Features-rightGradientShape { fill: url(#Features-rightGradient); }
              .Features-leftGradientShape { fill: url(#Features-leftGradient); }
            `}
            </style>

            {/* Gradient wave fill */}
            <g id="Gradient_Wave_Fill">
              <g className="Features-gradientGroup1">
                <path
                  className="Features-bottomGradientShape"
                  d="M1917.4,109.1c-45.4,45.3-57.8,106.8-150,126.3c-85.6,18.1-84.8,136-143.8,136c-82,0-106,160-193,160
                  c-37,0-41-22-91-22c-68,0-86,81-149,81c-43,0-49-27-92-27s-65,32-116,32s-62-41-140-41c-103,0-143,98-196,98c-40,0-39-30-72-30
                  c-32,0-37,37-87,37c-54.3,0-81-68-123-68c-43,0-65.3,85.3-124,91c-41.2,4-51.2-15-77.2-9c-39.5,9.1-43.1,65.6-91,69
                  c-42,3-43.6-30-69.8-30l-0.2,64h1999v-711C1998.4,65.3,1961,65.6,1917.4,109.1z"
                />
                <path
                  className="Features-innerGradientShape"
                  d="M1916.4,109.1c-45.4,45.3-57.8,106.8-150,126.3c-85.6,18.1-84.8,136-143.8,136c-82,0-106,160-193,160
                  c-37,0-41-22-91-22c-68,0-86,81-149,81c-43,0-49-27-92-27s-65,32-116,32c-51,0-62-41-140-41c-103,0-143,98-196,98
                  c-40,0-39-30-72-30c-32,0-37,37-87,37c-54.3,0-81-68-123-68c-43,0-65.3,85.3-124,91c-41.2,4-51.2-15-77.2-9
                  c-39.5,9.1-43.1,65.6-91,69c-42,3-43.6-30-69.8-30l-0.2,64h2000v-711C1998.4,65.3,1960,65.6,1916.4,109.1z"
                />
              </g>
              <g className="Features-gradientGroup2">
                <path
                  className="Features-bottomGradientShape"
                  d="M1917.4,109.1c-45.4,45.3-57.8,106.8-150,126.3c-85.6,18.1-84.8,136-143.8,136c-82,0-106,160-193,160
                  c-37,0-41-22-91-22c-68,0-86,81-149,81c-43,0-49-27-92-27s-65,32-116,32s-62-41-140-41c-103,0-143,98-196,98c-40,0-39-30-72-30
                  c-32,0-37,37-87,37c-54.3,0-81-68-123-68c-43,0-65.3,85.3-124,91c-41.2,4-51.2-15-77.2-9
                  c-39.5,9.1-43.1,65.6-91,69c-42,3-43.6-30-69.8-30l-0.2,64h1999v-711C1998.4,65.3,1961,65.6,1917.4,109.1z"
                />
                <path
                  className="Features-innerGradientShape"
                  d="M1916.4,109.1c-45.4,45.3-57.8,106.8-150,126.3c-85.6,18.1-84.8,136-143.8,136c-82,0-106,160-193,160
                  c-37,0-41-22-91-22c-68,0-86,81-149,81c-43,0-49-27-92-27s-65,32-116,32c-51,0-62-41-140-41c-103,0-143,98-196,98
                  c-40,0-39-30-72-30c-32,0-37,37-87,37c-54.3,0-81-68-123-68c-43,0-65.3,85.3-124,91c-41.2,4-51.2-15-77.2-9
                  c-39.5,9.1-43.1,65.6-91,69c-42,3-43.6-30-69.8-30l-0.2,64h2000v-711C1998.4,65.3,1960,65.6,1916.4,109.1z"
                />
              </g>
            </g>

            {/* Background dotted wave */}
            <g id="Background_Dotted_Wave">
              <path
                className="Features-dottedWaveShape"
                d="M1.6,748.4c95.2,0,78.8-77,147.3-88c37-5.9,58,22,90.7,22c59,0,78.4-145.9,121.4-145.9
                c42,0,71.2,162,125.6,162c50,0,55-104,87-104c33,0,32,30.3,72,30.3c53,0,83.1-88.4,166.5-88.4c80.1,0,99.4,84.1,148.5,97.7
                c52,14.4,94-43.2,137-43.2s49,31.4,92,31.4c63,0,76-113.3,141-133.2c43-13.2,62,19.6,99,19.6c87,0,111-182.5,193-182.5
                c59,0,71.2-202.3,136-217.2c46.8-10.7,89.8,13.3,136.8-29.7c44.8-41,68.4-64,106.2-64"
              />
            </g>

            {/* White wave */}
            <g id="Features-whiteWave">
              <path
                className="Features-whiteWaveLine"
                d="M2001.6,65.4c0,0-39.8-1.6-85.2,43.7s-57.8,106.8-150,126.3c-85.6,18.1-84.8,136-143.8,136
                c-82,0-106,160-193,160c-37,0-41-22-91-22c-68,0-86,81-149,81c-43,0-49-27-92-27s-65,32-116,32c-51,0-62-41-140-41
                c-103,0-143,98-196,98c-40,0-39-30-72-30c-32,0-37,37-87,37c-54.3,0-81-68-123-68c-43,0-65.3,85.3-124,91c-41.2,4-51.2-15-77.2-9
                c-39.5,9.1-43.1,65.6-91,69c-42,3-43.6-30-69.8-30"
              />
            </g>

            {/* Blue line path for the moving dot */}
            <g id="Features-blueLine">
              <path
                id="features-blue-path"
                className="Features-blueStroke"
                d="M2001.6,65.4c0,0-39.8-1.6-85.2,43.7s-57.8,106.8-150,126.3c-85.6,18.1-84.8,136-143.8,136
                c-82,0-106,160-193,160c-37,0-41-22-91-22c-68,0-86,81-149,81c-43,0-49-27-92-27s-65,32-116,32c-51,0-62-41-140-41
                c-103,0-143,98-196,98c-40,0-39-30-72-30c-32,0-37,37-87,37c-54.3,0-81-68-123-68c-43,0-65.3,85.3-124,91c-41.2,4-51.2-15-77.2-9
                c-39.5,9.1-43.1,65.6-91,69c-42,3-43.6-30-69.8-30"
              />
            </g>

            {/* ONE moving dot going the other way */}
            <g>
              <circle className="Features-dot" r="7">
                <animateMotion
                  dur="18s"
                  repeatCount="indefinite"
                  rotate="auto"
                  calcMode="linear"
                  keyPoints="1;0"
                  keyTimes="0;1"
                >
                  <mpath xlinkHref="#features-blue-path" />
                </animateMotion>
              </circle>
            </g>

            {/* Gradient borders */}
            <g id="Features-gradientBorders">
              <rect
                x="1.4"
                y="3.9"
                className="Features-leftGradientShape"
                width="360.7"
                height="772.5"
              />
              <rect
                x="1640.9"
                y="3.9"
                className="Features-rightGradientShape"
                width="360.7"
                height="772.5"
              />
            </g>
          </svg>

          {/* Overlay heading + cards */}
          <div
            className={`pointer-events-auto absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-700 ease-out ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"
            }`}
          >
            <h2 className="text-3xl font-bold text-center mb-6 bg-background/60 backdrop-blur-sm px-4 py-2 rounded-xl">
              Your journey to a successful sale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className="text-center bg-background/80 backdrop-blur-sm border border-white/10 shadow-lg"
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <step.icon className={`h-12 w-12 ${step.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}